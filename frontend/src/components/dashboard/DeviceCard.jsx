// src/components/dashboard/DeviceCard.jsx
import { useState } from 'react';
import ChartComponent from './ChartComponent';

const DeviceCard = ({ device }) => {
  const [showChart, setShowChart] = useState(false);
  
  // Calculate status based on last update time
  const calculateStatus = (timestamp) => {
    const now = new Date();
    const lastUpdate = new Date(timestamp);
    const diffMinutes = (now - lastUpdate) / (1000 * 60);
    
    if (diffMinutes < 5) return { status: 'online', color: '#4CAF50' };
    if (diffMinutes < 15) return { status: 'idle', color: '#FFC107' };
    return { status: 'offline', color: '#F44336' };
  };
  
  const { status, color } = calculateStatus(device.timestamp);
  
  return (
    <div className="device-card">
      <div className="card-header">
        <h3>Device: {device.deviceId}</h3>
        <div className="device-status">
          <span 
            className="status-indicator" 
            style={{ backgroundColor: color }}
          ></span>
          <span>{status}</span>
        </div>
      </div>
      
      <div className="card-body">
        <div className="readings">
          <div className="reading temperature">
            <i className="icon">🌡️</i>
            <div className="value">{device.temperature.toFixed(1)}°C</div>
          </div>
          <div className="reading humidity">
            <i className="icon">💧</i>
            <div className="value">{device.humidity.toFixed(1)}%</div>
          </div>
        </div>
        
        <div className="last-update">
          Last updated: {new Date(device.timestamp).toLocaleString()}
        </div>
        
        <button 
          className="chart-toggle-btn"
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? 'Hide Chart' : 'Show Chart'}
        </button>
        
        {showChart && <ChartComponent deviceId={device.deviceId} />}
      </div>
    </div>
  );
};

export default DeviceCard;