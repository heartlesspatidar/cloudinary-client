import { useState } from 'react';
import axios from 'axios';
const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;

export const useUploadFile = () => {
  const [uploadMessages, setUploadMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function to handle file uploads
  const uploadFile = async (file, type) => {
    try {
      // Validate file type
      if (!file || !type) {
        throw new Error('File or type is missing');
      }
  
      // Map incoming types to Cloudinary folder names
      const typeMapping = {
        img: 'image',
        video: 'video',
        music: 'music',
      };
  
      const cloudinaryType = typeMapping[type];
  
      // Validate if the type is correct
      if (!cloudinaryType) {
        throw new Error('Invalid type. Supported types are: img, video, music');
      }
  
      // Initialize FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', `${cloudinaryType}_preset`);  // Dynamic preset
  
      // Make the request to Cloudinary
      const response = await axios.post(cloudinaryUrl, formData);
  
      // Extract the secure URL from the response
      const { secure_url } = response.data;
  
      // Push success message with the file URL
      setUploadMessages((prevMessages) => [
        ...prevMessages,
        {
          message: `${cloudinaryType.charAt(0).toUpperCase() + cloudinaryType.slice(1)} uploaded successfully!`,
          type: 'success',
          url: secure_url,
        },
      ]);
    } catch (error) {
      // Handle errors (e.g., validation, upload failure)
      console.error(error);
      setUploadMessages((prevMessages) => [
        ...prevMessages,
        {
          message: `Failed to upload ${type}. Please try again.`,
          type: 'error',
        },
      ]);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (files) => {
    setLoading(true);
    const fileTypes = ['img', 'video', 'music']; // Types to be uploaded

    // Upload each file based on its type
    for (const type of fileTypes) {
      const file = files[type]?.[0]; // Get the first file (if available)
      if (file) {
        await uploadFile(file, type);
      }
    }

    setLoading(false);
  };

  return {
    uploadMessages,
    handleSubmit,
    loading,
  };
};
