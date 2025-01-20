import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/Upload';
import Home from './components/Home';

const App = () => {
  return (
    <Router basename="/cloudinary-client">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
};

export default App;
