/* eslint-disable no-unused-vars */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/upload'; 
import Home from './components/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
};

export default App;
