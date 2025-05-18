// src/components/admin/AdminConsole.jsx
import { useState } from 'react';
import DeviceForm from './DeviceForm';
import { deviceDataApi } from '../../api/api';

const AdminConsole = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Load recent device data
  const loadRecentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await deviceDataApi.getAll(null, 10);
      
      if (response.success) {
        setDeviceList(response.data);
      }
    } catch (err) {
      setError('Failed to load device data');
      console.error('Error loading recent data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle data deletion
  const handleDeleteData = async (id) => {
    if (!window.confirm('Are you sure you want to delete this data?')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await deviceDataApi.deleteData(id);
      
      if (response.success) {
        // Remove from list without re-fetching
        setDeviceList(prevList => prevList.filter(item => item._id !== id));
      }
    } catch (err) {
      setError('Failed to delete data');
      console.error('Error deleting data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-console">
      <div className="admin-header">
        <h2>IoT Admin Console</h2>
        <p>Use this interface to upload simulated device data</p>
      </div>
      
      <div className="admin-content">
        <div className="form-section">
          <DeviceForm />
        </div>
        
        <div className="data-section">
          <div className="data-header">
            <h3>Recent Data Entries</h3> 
            <button 
              className="load-button"
              onClick={loadRecentData}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load Recent Data'}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          {deviceList.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                  <th>Timestamp</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deviceList.map((item) => (
                  <tr key={item._id}>
                    <td>{item.deviceId}</td>
                    <td>{item.temperature.toFixed(1)}°C</td>
                    <td>{item.humidity.toFixed(1)}%</td>
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteData(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data-message">
              {loading ? 'Loading data...' : 'No data to display. Click "Load Recent Data" to view entries.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;