// src/components/admin/DeviceForm.jsx
import { useState, useEffect } from 'react';
import { useDeviceData } from '../../context/DeviceDataContext';

const DeviceForm = () => {
  const { addDeviceData } = useDeviceData();
  const [formData, setFormData] = useState({
    deviceId: '',
    temperature: '',
    humidity: ''
  });
  const [recentDevices, setRecentDevices] = useState([]);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  
  // Load recent devices from localStorage on mount
  useEffect(() => {
    const savedDevices = localStorage.getItem('recentDevices');
    if (savedDevices) {
      setRecentDevices(JSON.parse(savedDevices));
    }
  }, []);
  
  // Save deviceId to localStorage
  const saveDeviceToLocalStorage = (deviceId) => {
    if (!deviceId) return;
    
    // Add to recent devices if not already there
    const updatedDevices = recentDevices.includes(deviceId)
      ? recentDevices
      : [deviceId, ...recentDevices.slice(0, 4)]; // Keep only the 5 most recent
    
    setRecentDevices(updatedDevices);
    localStorage.setItem('recentDevices', JSON.stringify(updatedDevices));
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Select a recent device
  const selectRecentDevice = (deviceId) => {
    setFormData(prev => ({ ...prev, deviceId }));
  };
  
  // Generate random data
  const generateRandomData = () => {
    // Generate random values within realistic ranges
    setFormData(prev => ({
      ...prev,
      temperature: (Math.random() * 30 + 10).toFixed(1), // 10°C to 40°C
      humidity: (Math.random() * 60 + 20).toFixed(1)     // 20% to 80%
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.deviceId || !formData.temperature || !formData.humidity) {
      setStatus({ message: 'All fields are required', type: 'error' });
      return;
    }
    
    try {
      setLoading(true);
      setStatus({ message: 'Submitting data...', type: 'info' });
      
      // Parse numeric values
      const dataToSubmit = {
        deviceId: formData.deviceId,
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity)
      };
      
      const result = await addDeviceData(dataToSubmit);
      
      if (result.success) {
        setStatus({ message: 'Data submitted successfully!', type: 'success' });
        saveDeviceToLocalStorage(formData.deviceId);
        
        // Clear form fields except deviceId
        setFormData(prev => ({
          deviceId: prev.deviceId,
          temperature: '',
          humidity: ''
        }));
      } else {
        setStatus({ message: result.error || 'Failed to submit data', type: 'error' });
      }
    } catch (err) {
      setStatus({ message: 'An error occurred', type: 'error' });
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="device-form-container">
      <h3>Submit IoT Device Data</h3>
      
      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="device-form">
        <div className="form-group">
          <label htmlFor="deviceId">Device ID</label>
          <input
            type="text"
            id="deviceId"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            placeholder="Enter device ID"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="temperature">Temperature (°C)</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="Enter temperature"
            step="0.1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="humidity">Humidity (%)</label>
          <input
            type="number"
            id="humidity"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            placeholder="Enter humidity"
            step="0.1"
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="button secondary"
            onClick={generateRandomData}
          >
            Generate Random Data
          </button>
          
          <button 
            type="submit" 
            className="button primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Data'}
          </button>
        </div>
      </form>
      
      {recentDevices.length > 0 && (
        <div className="recent-devices">
          <h4>Recent Devices</h4>
          <div className="device-tags">
            {recentDevices.map((deviceId, index) => (
              <button
                key={index}
                className="device-tag"
                onClick={() => selectRecentDevice(deviceId)}
              >
                {deviceId}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceForm;