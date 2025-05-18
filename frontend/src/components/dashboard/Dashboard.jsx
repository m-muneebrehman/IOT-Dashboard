// src/components/dashboard/Dashboard.jsx
import { useState } from 'react';
import { useDeviceData } from '../../context/DeviceDataContext';
import DeviceCard from './DeviceCard';

const Dashboard = () => {
  const { deviceData, loading, error, refreshInterval, changeRefreshInterval, fetchLatestData } = useDeviceData();
  const [filterDeviceId, setFilterDeviceId] = useState('');
  
  // Filter devices based on input
  const filteredDevices = filterDeviceId
    ? deviceData.filter(device => device.deviceId.toLowerCase().includes(filterDeviceId.toLowerCase()))
    : deviceData;
  
  // Handle refresh interval change
  const handleIntervalChange = (e) => {
    const newInterval = parseInt(e.target.value);
    changeRefreshInterval(newInterval);
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>IoT Device Monitoring Dashboard</h2>
        <div className="dashboard-controls">
          <div className="filter-container">
            <input
              type="text"
              placeholder="Filter by Device ID"
              value={filterDeviceId}
              onChange={(e) => setFilterDeviceId(e.target.value)}
              className="filter-input"
            />
          </div>
          
          <div className="refresh-controls">
            <label htmlFor="refresh-interval">Refresh every:</label>
            <select
              id="refresh-interval"
              value={refreshInterval}
              onChange={handleIntervalChange}
              className="refresh-select"
            >
              <option value={2000}>2 seconds</option>
              <option value={5000}>5 seconds</option>
              <option value={10000}>10 seconds</option>
              <option value={30000}>30 seconds</option>
              <option value={60000}>1 minute</option>
            </select>
            
            <button 
              className="refresh-button"
              onClick={fetchLatestData}
            >
              Refresh Now
            </button>
          </div>
        </div>
      </div>
      
      {loading && <div className="loading-message">Loading device data...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      
      {!loading && !error && filteredDevices.length === 0 && (
        <div className="no-devices-message">
          {filterDeviceId ? 'No devices match your filter' : 'No devices found'}
        </div>
      )}
      
      <div className="device-grid">
        {filteredDevices.map((device) => (
          <DeviceCard key={device._id || device.deviceId} device={device} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;