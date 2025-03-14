import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllAssets } from '../../api/assetApi';
import { getComponentsByAssetId } from '../../api/componentApi';
import { handleApiError } from '../../utils/helpers';
import Pagination from '../../components/Pagination';
import './Dashboard.css';

const PAGE_SIZES = [10, 20, 30, 50, 100];
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
  const [allAssets, setAllAssets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAssets = async () => {
    try {
      const response = await getAllAssets();
      const allAssetsData = response; 
      setAllAssets(allAssetsData); 
      const totalItems = allAssetsData.length;
      const paginatedAssets = allAssetsData.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
      setAssets(paginatedAssets);
      setTotalPages(Math.max(1, Math.ceil(totalItems / pageSize)));
    } catch (error) {
      alert(handleApiError(error));
    }
  };


  // const fetchAssetsApi = async (page = 1, pageSize = 10) => {
  //   try {
  //     const response = await loadAssets(page-1, pageSize); // API call
  //     setAssets(response.items.reverse()); // Backend should return items in 'items' key
  //     setTotalPages(Math.max(1, Math.ceil(response.totalItems / pageSize)));
  //   } catch (error) {
  //     alert(handleApiError(error));
  //   }
  // };

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
  
  // useEffect(()=>{
  //   fetchAssetsApi(page, pageSize);
  // },[page,pageSize]);

  useEffect(() => {
    fetchAssets();
  }, [page, pageSize]);
  

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
      <div className="dashboard-header">
        <div className="page-size-selector">
          <label>Page Size:</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <Link to="/add-asset" className="add-asset-button-top">
          Add Asset
        </Link>
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
      <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={(newPage) => setPage(newPage)}
/>
    </div>
  );
}

export default Dashboard;
