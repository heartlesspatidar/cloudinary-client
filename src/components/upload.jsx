import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useUploadFile } from './useUploadFile.jsx'; // Ensure this custom hook is correctly imported
import './Upload.css';

const Upload = () => {
  const [files, setFiles] = useState({ img: [], video: [], music: [] });
  const { uploadMessages, handleSubmit, loading } = useUploadFile();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected Files:', files);

    // Check if at least one file is selected
    if (!files.img.length && !files.video.length && !files.music.length) {
      alert('Please select at least one file to upload.');
      return;
    }

    // Submit the form to handle the upload
    await handleSubmit(files);

    // Reset state after successful upload
    setFiles({ img: [], video: [], music: [] });
  };

  // Handle file selection for each file type
  const handleFileChange = (type) => (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevState) => ({ ...prevState, [type]: selectedFiles }));
  };

  const renderFilePreview = (file, type) => {
    if (type === 'img') {
      return <img src={URL.createObjectURL(file)} alt="preview" className="file-preview" />;
    }
    if (type === 'video') {
      return <video controls src={URL.createObjectURL(file)} className="file-preview" />;
    }
    if (type === 'music') {
      return <audio controls src={URL.createObjectURL(file)} className="file-preview" />;
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Your Files</h1>
      <form onSubmit={onSubmit} className="upload-form">
        <div className="file-input">
          <label htmlFor="img">Image:</label>
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={handleFileChange('img')}
            disabled={loading}
          />
          {files.img.length > 0 && renderFilePreview(files.img[0], 'img')}
        </div>
        <div className="file-input">
          <label htmlFor="video">Video:</label>
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={handleFileChange('video')}
            disabled={loading}
          />
          {files.video.length > 0 && renderFilePreview(files.video[0], 'video')}
        </div>
        <div className="file-input">
          <label htmlFor="music">Music:</label>
          <input
            type="file"
            accept="audio/*"
            id="music"
            onChange={handleFileChange('music')}
            disabled={loading}
          />
          {files.music.length > 0 && renderFilePreview(files.music[0], 'music')}
        </div>
        <button type="submit" className="upload-button" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {loading && (
        <div className="loader">
          <ThreeDots height="80" width="80" radius="9" color="#4fa94d" />
        </div>
      )}

      <div className="upload-messages">
        {uploadMessages.map((msg, index) => (
          <div key={index} className={`message-box ${msg.type}`}>
            <p>{msg.message}</p>
            {msg.url && (
              <a href={msg.url} target="_blank" rel="noopener noreferrer">
                <button className="url-button">View {msg.type}</button>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
