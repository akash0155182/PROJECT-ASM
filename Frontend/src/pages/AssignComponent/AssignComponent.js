import React, { useState, useEffect } from 'react';
import './AssignComponent.css';
import { useNavigate } from 'react-router-dom';
import { getAllAssets, assignComponentToAsset } from '../../api/assetApi';
import { getAllComponents } from '../../api/componentApi';
import { handleApiError } from '../../utils/helpers';
import Dropdown from '../../components/Dropdown';

const AssignComponent = () => {
  const [assets, setAssets] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssetsAndComponents = async () => {
      try {
        const assetsData = await getAllAssets();
        const componentsData = await getAllComponents();

        setAssets(
          assetsData.map(({ id, name, category }) => ({
            id,
            label: `${name} (${category})`,
          }))
        );

        setComponents(
          componentsData.map(({ id, name, category, manufacturer, serialNumber, warrantyEnd }) => ({
            id,
            label: `${name} (${category}) - ${manufacturer} | Serial: ${serialNumber} | Warranty: ${warrantyEnd}`,
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAssetsAndComponents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAsset || !selectedComponent) {
      alert('Please select both an asset and a component.');
      return;
    }

    try {
      await assignComponentToAsset(selectedAsset, selectedComponent);
      setSuccess(true);
      setSelectedAsset('');
      setSelectedComponent('');

      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  return (
    <div className="assign-component-container">
      <h2>Assign Component to Asset</h2>
      <form onSubmit={handleSubmit}>
        <Dropdown
          label="Select Asset:"
          options={assets}
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          placeholder="-- Select Asset --"
          required
        />
        <Dropdown
          label="Select Component:"
          options={components}
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
          placeholder="-- Select Component --"
          required
        />
        <button type="submit">Assign Component</button>
      </form>
      {success && <p className="success-message">Component assigned successfully! Redirecting...</p>}
    </div>
  );
};

export default AssignComponent;
