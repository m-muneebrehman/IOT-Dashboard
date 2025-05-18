// src/components/dashboard/ChartComponent.jsx
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { deviceDataApi } from '../../api/api';

const ChartComponent = ({ deviceId }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        const response = await deviceDataApi.getAll(deviceId, 20);
        
        if (response.success) {
          // Format data for the chart
          const formattedData = response.data.map(item => ({
            time: new Date(item.timestamp).toLocaleTimeString(),
            temperature: item.temperature,
            humidity: item.humidity
          })).reverse(); // Reverse to show chronological order
          
          setChartData(formattedData);
        }
      } catch (err) {
        setError('Failed to load historical data');
        console.error('Error fetching chart data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistoricalData();
  }, [deviceId]);
  
  if (loading) return <div className="chart-loading">Loading chart data...</div>;
  if (error) return <div className="chart-error">{error}</div>;
  if (chartData.length === 0) return <div className="no-data">No historical data available</div>;
  
  return (
    <div className="chart-container">
      <h4>Historical Data</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="temperature" 
            stroke="#FF5722" 
            activeDot={{ r: 8 }} 
            name="Temperature (°C)" 
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="humidity" 
            stroke="#2196F3" 
            name="Humidity (%)" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;