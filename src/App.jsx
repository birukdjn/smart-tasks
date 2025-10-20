// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CollaborationProvider } from './contexts/CollaborationContext';
import Hero from './pages/Hero';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Team from './pages/Team';
import Analytics from './pages/Analytics';

function App() {
  return (
    <ThemeProvider>
      <CollaborationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/team" element={<Team />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/signup" element={<div className="p-8">Signup Page - Coming Soon</div>} />
          </Routes>
        </Router>
      </CollaborationProvider>
    </ThemeProvider>
  );
}

export default App;