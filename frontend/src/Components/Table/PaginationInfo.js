import React from 'react';

export default function PaginationInfo({ currentPage, totalPages, rowsPerPage }) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <div>
        Showing up to {rowsPerPage} products per page
      </div>
    </div>
  );
}
