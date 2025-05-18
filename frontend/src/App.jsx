// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DeviceDataProvider } from './context/DeviceDataContext';
import Dashboard from './components/dashboard/Dashboard';
import AdminConsole from './components/admin/AdminConsole';
import './App.css';

function App() {
  return (
    <DeviceDataProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="navbar-logo">
              <h1>IoT Monitor</h1>
            </div>
            <ul className="navbar-links">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin">Admin Console</Link>
              </li>
            </ul>
          </nav>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin" element={<AdminConsole />} />
            </Routes>
          </main>
          
          <footer className="footer">
            <p>Real-Time IoT Monitoring System &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </Router>
    </DeviceDataProvider>
  );
}

export default App;