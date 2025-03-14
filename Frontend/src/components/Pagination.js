import React from 'react';
import './Pagination.css';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1 || totalPages <= 1}
        className="page-btn"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`page-btn ${page === i + 1 ? 'active' : ''}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages || totalPages <= 1}
        className="page-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
