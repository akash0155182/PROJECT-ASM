import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAsset } from '../../api/assetApi';
import { handleApiError } from '../../utils/helpers';
import './AddAsset.css';

const AddAsset = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    purchaseDate: '',
    status: '',
    assignedTo: '',
  });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAsset(formData);
      setSuccess(true);
      setFormData({ name: '', category: '', description: '', purchaseDate: '', status: '', assignedTo: '' });

      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  const { name, category, description, purchaseDate, status, assignedTo } = formData;

  return (
    <div className="add-asset-container">
      <h2>Add New Asset</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Asset Name" value={name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={category} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={description} onChange={handleChange} required />
        <input type="date" name="purchaseDate" value={purchaseDate} onChange={handleChange} required />
        <input type="text" name="status" placeholder="Status" value={status} onChange={handleChange} required />
        <input type="text" name="assignedTo" placeholder="Assigned To" value={assignedTo} onChange={handleChange} />
        <button type="submit">Add Asset</button>
      </form>
      {success && <p className="success-message">Asset added successfully! Redirecting...</p>}
    </div>
  );
};

export default AddAsset;
