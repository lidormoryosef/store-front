import React from 'react';

export default function ProductSearch({ search, onSearchChange }) {
  return (
    <input
      type="search"
      className="form-control mb-3"
      placeholder="Search Fruit and Vegetable..."
      value={search}
      onChange={onSearchChange}
    />
  );
}
