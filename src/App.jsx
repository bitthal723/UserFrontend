import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import User from './Components/User';  // Assuming this is your User component
import OrderTracking from './Components/OrderTracking';
function App() {

  return (
    <Router basename="/UserFrontend">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/track" element={<OrderTracking />} />
      </Routes>
    </Router>
  );
}

export default App;
