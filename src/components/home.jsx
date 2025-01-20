import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Our Cloud Storage App</h1>
      <p className="home-description">
        This app allows you to upload and manage your files effortlessly.
      </p>
      <div className="upload-info">
        <h2>Upload Your Files</h2>
        <p>Visit the <a href="/cloudinary-client/upload">/upload</a> route to start storing your files!</p>
      </div>
    </div>
  );
};

export default Home;
