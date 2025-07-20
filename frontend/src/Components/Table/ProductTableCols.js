import React from 'react';

export default function ProductTableCols({ sortableFields, sortBy, order, onSort }) {
  return (
    <tr>
      {sortableFields.map((field) => (
        <th
          key={field}
          role="button"
          onClick={() => onSort(field)}
          className="sortable-header"
          scope="col"
          style={{ userSelect: 'none', cursor: 'pointer' }}
        >
          {field.charAt(0).toUpperCase() + field.slice(1)}
          {sortBy === field && (
            <span className={`sort-arrow ${order === 'asc' ? 'asc' : 'desc'}`}></span>
          )}
        </th>
      ))}
    </tr>
  );
}
