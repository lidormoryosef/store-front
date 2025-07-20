import React, { useState, useEffect } from 'react';
import ProductSearch from './ProductSearch';
import ProductPagination from './ProductPagination';
import PaginationInfo from './PaginationInfo';
import EditProductModal from './EditProductModal';
import ProductTable from './ProductTable'
import './WrapTable.css';

const SORTABLE_FIELDS = ['name', 'description', 'type', 'date'];

export default function WrapTable() {
  let d = [
  {
    "id": 1,
    "name": "Apple",
    "catalogNumber": "CAT-1001",
    "description": "Fresh red apples, crispy and juicy.",
    "type": "Fruit",
    "marketingDate": "2025-07-13"
  },
  {
    "id": 2,
    "name": "Carrot",
    "catalogNumber": "CAT-1002",
    "description": "Organic orange carrots, perfect for salads.",
    "type": "Vegetable",
    "marketingDate": "2025-07-12"
  },
  {
    "id": 3,
    "name": "Wheat",
    "catalogNumber": "CAT-1003",
    "description": "High-quality wheat grains for baking.",
    "type": "Field crops",
    "marketingDate": "2025-07-10"
  },
  {
    "id": 4,
    "name": "Banana",
    "catalogNumber": "CAT-1004",
    "description": "Sweet ripe bananas full of potassium.",
    "type": "Fruit",
    "marketingDate": "2025-07-11"
  },
  {
    "id": 5,
    "name": "Spinach",
    "catalogNumber": "CAT-1005",
    "description": "Fresh green spinach leaves, packed with vitamins.",
    "type": "Vegetable",
    "marketingDate": "2025-07-09"
  }
]
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState(d);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `/api/products?page=${currentPage}&limit=${rowsPerPage}&search=${encodeURIComponent(search)}&sortBy=${sortBy}&order=${order}`
      );
      const result = await res.json();
      setData(result.data);
      setTotalItems(result.totalItems);
    }
    fetchData();
  }, [currentPage, rowsPerPage, search, sortBy, order]);

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  const handleSort = (field) => {
    if (!SORTABLE_FIELDS.includes(field)) return;
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('asc');
    }
    setCurrentPage(0);
  };

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <ProductSearch search={search} onSearchChange={handleSearchChange} />
      <ProductTable data={data} sortableFields={SORTABLE_FIELDS} sortBy={sortBy} order={order} onSort={handleSort}
        onRowClick={(product) => {
        setSelectedProduct(product);
        setShowModal(true);}}/>
      <PaginationInfo currentPage={currentPage} totalPages={totalPages} rowsPerPage={rowsPerPage}/>
      <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
      {showModal && selectedProduct && (<EditProductModal show={showModal} product={selectedProduct} onClose={() => setShowModal(false)}
          onSave={(updatedProduct) => {
                setData((prev) =>
                prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
                setShowModal(false);
            }}/>)}
    </div>
    
  );
}
