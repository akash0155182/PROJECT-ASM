import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllAssets } from '../../api/assetApi';
import { getComponentsByAssetId } from '../../api/componentApi';
import { handleApiError } from '../../utils/helpers';
import './Dashboard.css';

const HEADERS = {
  name: 'Name',
  category: 'Category',
  description: 'Description',
  purchaseDate: 'Purchase Date',
  status: 'Status',
  assignedTo: 'Assigned To',
  actions: 'Actions',
};

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const fetchAssets = async () => {
    try {
      const data = await getAllAssets();
      setAssets(data);
    } catch (error) {
      alert(handleApiError(error));
    }
  };

  const fetchComponents = async (assetId) => {
    try {
      const components = await getComponentsByAssetId(assetId);
      setAssets(prevAssets =>
        prevAssets.map(asset =>
          asset.id === assetId ? { ...asset, components } : asset
        )
      );
    } catch (error) {
      alert(handleApiError(error));
    }
  };
  
  useEffect(() => {
    fetchAssets();
  }, []);

  const toggleExpand = (assetId) => {
    if (expanded === assetId) {
      setExpanded(null); 
    } else {
      setExpanded(assetId);
      fetchComponents(assetId);
    }
  };

  return (
    <div className="dashboard">
      <h2>Asset List</h2>
      <div className="add-asset-wrapper">
        <Link to="/add-asset" className="add-asset-button-top"> Add Asset</Link>
      </div>
      <table className="asset-table">
        <thead>
          <tr>
          {Object.values(HEADERS).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map(({ id, name, category, description, purchaseDate, status, assignedTo, components }) => (
            <>
              <tr key={id}>
                <td>{name}</td>
                <td>{category}</td>
                <td>{description}</td>
                <td>{purchaseDate}</td>
                <td>{status}</td>
                <td>{assignedTo}</td>
                <td>
                  <button className="toggle-button" onClick={() => toggleExpand(id)}>
                    {expanded === id ? 'Collapse' : 'Expand'}
                  </button>
                  <Link className="details-link" to={`/asset/${id}`}>Details</Link>
                </td>
              </tr>
              {expanded === id && (
                <tr className="expanded-row">
                  <td colSpan={Object.keys(HEADERS).length}>
                    <strong>Components:</strong>
                    <ul>
                      {components?.length > 0 ? (
                        components.map(({ name, category, manufacturer, serialNumber, warrantyEnd }, index) => (
                          <li key={index}>
                            {name} ({category}), {manufacturer} - Serial: {serialNumber}, Warranty: {warrantyEnd}
                          </li>
                        ))
                      ) : (
                        <li>No components assigned</li>
                      )}
                    </ul>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
