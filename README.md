# IoT Monitoring System (MERN Stack)

This project is a real-time IoT device monitoring system built with the MERN (MongoDB, Express, React, Node.js) stack. It consists of a user dashboard for monitoring IoT device data and an admin console for uploading simulated device data.

## Features

- **Real-time updates** - Dashboard refreshes data every 5 seconds
- **Interactive charts** - View historical temperature and humidity data
- **Device filtering** - Filter devices by ID
- **Admin console** - Upload simulated device data with a user-friendly form
- **Recent devices memory** - Admin console remembers recent devices using localStorage
- **Responsive design** - Works on desktop and mobile devices

## Project Structure

```
/iot-monitoring-system
  /backend            # Express server with MongoDB
    /models           # Mongoose models
    /routes           # API routes
    /middleware       # Custom middleware
    server.js         # Entry point
  /frontend           # React frontend (Vite)
    /src
      /components     # React components
      /context        # React context providers
      /api            # API service
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.mongodb.net/iot-monitoring
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Dashboard

- The dashboard shows all IoT devices with their latest temperature and humidity readings
- Devices are color-coded by status (online, idle, offline)
- Click "Show Chart" to view historical data for each device
- Adjust the refresh interval using the dropdown menu
- Filter devices by typing in the search bar

### Admin Console

- Enter a device ID, temperature, and humidity
- Click "Generate Random Data" to fill with random values
- Click "Submit Data" to send to the server
- Previously used device IDs are saved for quick access
- Click "Load Recent Data" to see recently added entries

## Completion Milestones

- [x] Backend server connected to MongoDB Atlas
- [x] RESTful API working for upload and retrieval
- [x] React dashboard displaying live IoT data
- [x] Admin console with working form
- [x] Error handling and UI validation

## Bonus Features

- [x] Charts using Recharts
- [x] Filter by deviceId
- [x] Live status indicators
- [x] Session persistence using localStorage

## Technologies Used

- **Frontend**:
  - React (with Hooks and Context API)
  - Vite
  - Recharts for visualizations
  - Axios for API requests
  - React Router for navigation

- **Backend**:
  - Node.js
  - Express
  - MongoDB with Mongoose
  - Middleware for error handling

## License

This project is for educational purposes only.
