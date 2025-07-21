import React from 'react';

export default function ProductPagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(
      <li
        key={i}
        className={`page-item ${currentPage === i ? 'active' : ''}`}
      >
        <button className="page-link" onClick={() => onPageChange(i)}>
          {i + 1}
        </button>
      </li>
    );
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() =>onPageChange(currentPage - 1) }
            disabled={currentPage === 0}
          >
            Previous
          </button>
        </li>

        {pages}

        <li className={`page-item ${currentPage === totalPages-1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1) }
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
