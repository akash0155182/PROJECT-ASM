import React from 'react';
import './InputField.css';

const InputField = ({ type = 'text', name, value, onChange, placeholder, required }) => (
  <div className="input-field">
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

export default InputField;
