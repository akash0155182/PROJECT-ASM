import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComponent } from '../../api/componentApi';
import { handleApiError } from '../../utils/helpers';
import InputField from '../../components/InputField';
import './AddComponent.css';

const componentFields = [
  { name: 'name', type: 'text', placeholder: 'Component Name', required: true },
  { name: 'category', type: 'text', placeholder: 'Category', required: true },
  { name: 'manufacturer', type: 'text', placeholder: 'Manufacturer', required: true },
  { name: 'serialNumber', type: 'text', placeholder: 'Serial Number', required: true },
  { name: 'warrantyEnd', type: 'date', placeholder: 'Warranty Expiry Date', required: true },
];

const AddComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    manufacturer: '',
    serialNumber: '',
    warrantyEnd: '',
  });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addComponent(formData);
      setSuccess(true);
      setFormData({ name: '', category: '', manufacturer: '', serialNumber: '', warrantyEnd: '' });

      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  return (
    <div className="add-component-container">
      <h2>Add New Component</h2>
      <form onSubmit={handleSubmit}>
        {componentFields.map((field) => (
          <InputField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Add Component</button>
      </form>
      {success && <p className="success-message">Component added successfully! Redirecting...</p>}
    </div>
  );
};

export default AddComponent;
