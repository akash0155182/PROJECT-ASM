import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AssignComponent.css';
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
    const fetchData = async () => {
      try {
        const assetsData = await getAllAssets();
        const componentsData = await getAllComponents();

        setAssets(
          assetsData.map((asset) => ({
            id: asset.id,
            label: `${asset.name} (${asset.category})`,
          }))
        );

        setComponents(
          componentsData.map((component) => ({
            id: component.id,
            label: `${component.name} (${component.category}) - ${component.manufacturer} | Serial: ${component.serialNumber} | Warranty: ${component.warrantyEnd}`,
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
          label="Select Asset"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          options={assets}
          placeholder="-- Select Asset --"
          required
        />
        <Dropdown
          label="Select Component"
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
          options={components}
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
