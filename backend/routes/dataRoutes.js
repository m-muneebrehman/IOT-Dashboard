// routes/dataRoutes.js - API routes for device data
const express = require('express');
const router = express.Router();
const DeviceData = require('../models/DeviceData');

// Middleware for common error handling
const asyncHandler = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @route   GET /api/data
 * @desc    Get all device data (with optional filtering)
 * @access  Public
 */
router.get('/', asyncHandler(async (req, res) => {
  const { deviceId, limit = 50 } = req.query;
  const query = deviceId ? { deviceId } : {};
  
  const data = await DeviceData.find(query)
    .sort({ timestamp: -1 })
    .limit(parseInt(limit));
  
  res.json({
    success: true,
    count: data.length,
    data
  });
}));

/**
 * @route   GET /api/data/latest
 * @desc    Get latest reading for each device
 * @access  Public
 */
router.get('/latest', asyncHandler(async (req, res) => {
  const latestData = await DeviceData.getLatestByDevice();
  
  res.json({
    success: true,
    count: latestData.length,
    data: latestData
  });
}));

/**
 * @route   GET /api/data/:id
 * @desc    Get device data by ID
 * @access  Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const data = await DeviceData.findById(req.params.id);
  
  if (!data) {
    res.status(404);
    throw new Error('Data not found');
  }
  
  res.json({
    success: true,
    data
  });
}));

/**
 * @route   POST /api/data
 * @desc    Add new device data
 * @access  Public
 */
router.post('/', asyncHandler(async (req, res) => {
  const { deviceId, temperature, humidity } = req.body;
  
  // Validate inputs
  if (!deviceId || temperature === undefined || humidity === undefined) {
    res.status(400);
    throw new Error('Please provide deviceId, temperature, and humidity');
  }
  
  const newData = await DeviceData.create({
    deviceId,
    temperature,
    humidity
  });
  
  res.status(201).json({
    success: true,
    data: newData
  });
}));

/**
 * @route   DELETE /api/data/:id
 * @desc    Delete device data entry
 * @access  Public (would typically be protected)
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const data = await DeviceData.findById(req.params.id);
  
  if (!data) {
    res.status(404);
    throw new Error('Data not found');
  }
  
  await data.remove();
  
  res.json({
    success: true,
    message: 'Data deleted'
  });
}));

module.exports = router;