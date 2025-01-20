import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/UploadPage';
import Home from './components/HomePage';

const App = () => {
  return (
    <Router basename="/cloudinary-client">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Upload" element={<Upload />} />
      </Routes>
    </Router>
  );
};

export default App;
