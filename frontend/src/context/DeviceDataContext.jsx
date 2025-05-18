// src/context/DeviceDataContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { deviceDataApi } from '../api/api';

// Create context
const DeviceDataContext = createContext();

export const useDeviceData = () => {
  const context = useContext(DeviceDataContext);
  if (!context) {
    throw new Error('useDeviceData must be used within a DeviceDataProvider');
  }
  return context;
};


// Create provider component
export const DeviceDataProvider = ({ children }) => {
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds default

  // Function to fetch latest device data
  const fetchLatestData = async () => {
    try {
      const response = await deviceDataApi.getLatest();
      if (response.success) {
        setDeviceData(response.data);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch device data');
      console.error('Error fetching device data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and polling setup
  useEffect(() => {
    // Fetch data immediately on mount
    fetchLatestData();
    
    // Set up polling interval
    const intervalId = setInterval(fetchLatestData, refreshInterval);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  // Add device data (used in admin console)
  const addDeviceData = async (deviceData) => {
    try {
      const response = await deviceDataApi.addData(deviceData);
      if (response.success) {
        // Refresh data after adding
        fetchLatestData();
        return { success: true, data: response.data };
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add device data';
      setError(errorMsg);
      console.error('Error adding device data:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Change refresh interval
  const changeRefreshInterval = (interval) => {
    setRefreshInterval(interval);
  };

  // Context value
  const value = {
    deviceData,
    loading,
    error,
    refreshInterval,
    fetchLatestData,
    addDeviceData,
    changeRefreshInterval
  };

  return (
    <DeviceDataContext.Provider value={value}>
      {children}
    </DeviceDataContext.Provider>
  );
};

// Custom hook for using the device data context


export default DeviceDataContext;