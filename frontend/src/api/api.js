
// src/api/api.js
import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// API functions for device data
export const deviceDataApi = {
  // Get all device data (with optional filtering)
  getAll: async (deviceId = null, limit = 50) => {
    const params = { limit };
    if (deviceId) params.deviceId = deviceId;
    
    const response = await api.get('/data', { params });
    return response.data;
  },
  
  // Get latest reading for each device
  getLatest: async () => {
    const response = await api.get('/data/latest');
    return response.data;
  },
  
  // Get device data by ID
  getById: async (id) => {
    const response = await api.get(`/data/${id}`);
    return response.data;
  },
  
  // Add new device data
  addData: async (deviceData) => {
    const response = await api.post('/data', deviceData);
    return response.data;
  },
  
  // Delete device data entry
  deleteData: async (id) => {
    const response = await api.delete(`/data/${id}`);
    return response.data;
  }
};

export default api;