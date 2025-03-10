import React from 'react';
import './Dropdown.css';

const Dropdown = ({ label, options, value, onChange, placeholder, required }) => {
  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <select value={value} onChange={onChange} required={required}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
