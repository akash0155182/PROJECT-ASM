import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAsset } from '../../api/assetApi';
import { handleApiError } from '../../utils/helpers';
import InputField from '../../components/InputField';
import './AddAsset.css';

const assetFields = [
  { name: 'name', type: 'text', placeholder: 'Asset Name', required: true },
  { name: 'category', type: 'text', placeholder: 'Category', required: true },
  { name: 'description', type: 'textarea', placeholder: 'Description', required: true },
  { name: 'purchaseDate', type: 'date', placeholder: 'Purchase Date', required: true },
  { name: 'status', type: 'text', placeholder: 'Status', required: true },
  { name: 'assignedTo', type: 'text', placeholder: 'Assigned To', required: false },
];

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
      setFormData({
        name: '',
        category: '',
        description: '',
        purchaseDate: '',
        status: '',
        assignedTo: '',
      });

      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  return (
    <div className="add-asset-container">
      <h2>Add New Asset</h2>
      <form onSubmit={handleSubmit}>
        {assetFields.map((field) => (
          <InputField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Add Asset</button>
      </form>
      {success && <p className="success-message">Asset added successfully! Redirecting...</p>}
    </div>
  );
};

export default AddAsset;
