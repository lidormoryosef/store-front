import React, { useState, useEffect } from 'react';
import ProductSearch from './ProductSearch';
import ProductPagination from './ProductPagination';
import PaginationInfo from './PaginationInfo';
import EditProductModal from './EditProductModal';
import ProductTable from './ProductTable'
import './WrapTable.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const SORTABLE_FIELDS = ['name', 'description', 'type', 'date'];

export default function WrapTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 7;
  
useEffect(() => {
  async function fetchData() {
    if (search && search.length > 0 && search.length < 3) {
      return;
    }
    const res = await fetch(
      `${API_BASE_URL}/api/products/getProducts?page=${currentPage}&limit=${rowsPerPage}&search=${encodeURIComponent(search)}&sortBy=${sortBy}&order=${order}`
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
  const handleSave = (updatedProduct) => {
    setData((prev) =>prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };
  const handleDelete = () => {
    setData((prev) => prev.filter((p) => p.id !== selectedProduct.id));
  };

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <ProductSearch search={search} onSearchChange={handleSearchChange} />
      <ProductTable data={data} sortableFields={SORTABLE_FIELDS} sortBy={sortBy} order={order} onSort={handleSort}
        onRowClick={(product) => {
        setSelectedProduct(product);
        setShowModal(true);}}/>
      <PaginationInfo currentPage={currentPage+1} totalPages={totalPages} rowsPerPage={rowsPerPage}/>
      <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
      {showModal && selectedProduct && (<EditProductModal show={showModal} product={selectedProduct} onClose={() => setShowModal(false)}
          onSave={handleSave} onDelete={handleDelete}/>)}
    </div>
    
  );
}
