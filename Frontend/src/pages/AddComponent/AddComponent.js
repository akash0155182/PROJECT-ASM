import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComponent } from '../../api/componentApi';
import { handleApiError } from '../../utils/helpers';
import './AddComponent.css';

const AddComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    manufacturer: '',
    serialNumber: '',
    warranty: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, manufacturer, serialNumber, warranty } = formData;
    const newComponent = { name, category, manufacturer, serialNumber, warrantyEnd: warranty };

    try {
      await addComponent(newComponent);
      setSuccess(true);
      setError('');
      setFormData({ name: '', category: '', manufacturer: '', serialNumber: '', warranty: '' });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  return (
    <div className="add-component-container">
      <h2>Add New Component</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Component Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="serialNumber"
          placeholder="Serial Number"
          value={formData.serialNumber}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="warranty"
          placeholder="Warranty Expiry Date"
          value={formData.warranty}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Component</button>
      </form>
      {success && <p className="success-message">Component added successfully! Redirecting...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddComponent;
