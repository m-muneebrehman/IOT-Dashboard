// models/DeviceData.js - MongoDB model for device data
const mongoose = require('mongoose');

const deviceDataSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: [true, 'Device ID is required'],
    trim: true
  },
  temperature: {
    type: Number,
    required: [true, 'Temperature is required'],
    min: [-50, 'Temperature must be at least -50°C'],
    max: [100, 'Temperature cannot exceed 100°C']
  },
  humidity: {
    type: Number,
    required: [true, 'Humidity is required'],
    min: [0, 'Humidity must be at least 0%'],
    max: [100, 'Humidity cannot exceed 100%']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add a static method to get latest readings by device
deviceDataSchema.statics.getLatestByDevice = async function() {
  // Aggregation to get the latest reading for each device
  return this.aggregate([
    {
      $sort: { deviceId: 1, timestamp: -1 }
    },
    {
      $group: {
        _id: "$deviceId",
        latestReading: { $first: "$$ROOT" }
      }
    },
    {
      $replaceRoot: { newRoot: "$latestReading" }
    },
    {
      $project: {
        _id: 1,
        deviceId: 1,
        temperature: 1,
        humidity: 1,
        timestamp: 1
      }
    }
  ]);
};

const DeviceData = mongoose.model('DeviceData', deviceDataSchema);

module.exports = DeviceData;