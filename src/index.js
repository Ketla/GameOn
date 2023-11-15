// In index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game from './Game';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/game" element={<Game />} />
        {/* other routes */}
      </Routes>
    </Router>
  </React.StrictMode>
);