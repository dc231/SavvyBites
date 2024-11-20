
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addComplain } from '../../services/operations/complaintApi';

const ComplaintForm = () => {
  const token = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    description: '',
    image: null, // Updated to handle the file
    hostel: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('description', formData.description);
      data.append('image', formData.image);
      data.append('hostel', formData.hostel);
      data.append('category', formData.category);

      const result = await addComplain(data, token.token);

      console.log('Complaint added successfully:', result);
    } catch (error) {
      console.error('Error adding complaint:', error);
    }
  };

  return (
  
  <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Complaint Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Description:</label>
          <textarea
            className="mt-1 p-2 w-full border rounded-md"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Profile Image:</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Hostel:</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            name="hostel"
            value={formData.hostel}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Category:</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
