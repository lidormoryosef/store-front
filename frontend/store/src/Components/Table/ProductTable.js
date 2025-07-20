import React from 'react';
import ProductTableCols from './ProductTableCols';
import ProductTableRows from './ProductTableRows';

export default function ProductTable({data,sortBy,order,onSort,onRowClick,sortableFields}) {
  return (
    <table className="table table-striped table-bordered align-middle product-table">
      <thead className="table-primary">
        <ProductTableCols
          sortableFields={sortableFields}
          sortBy={sortBy}
          order={order}
          onSort={onSort}
        />
      </thead>
      <tbody>
        <ProductTableRows data={data} onRowClick={onRowClick} />
      </tbody>
    </table>
  );
}
