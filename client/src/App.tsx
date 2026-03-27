import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth'; // Importing the Auth component

function App() {
  return (
    <Router>
      <Routes>
        {/* Main route for Login and Registration */}
        <Route path="/auth" element={<Auth />} />
        
        {/* Redirecting users from the root path to the auth page */}
        <Route path="/" element={<Navigate to="/auth" />} />

        {/* Future routes like Home Page can be added here */}
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;