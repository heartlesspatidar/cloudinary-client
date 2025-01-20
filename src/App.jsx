import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/upload'; 
import Home from './components/home';

const App = () => {
  return (
    <Router basename="/cloudinary-client"> {/* Ensure this is set correctly */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
};

export default App;
