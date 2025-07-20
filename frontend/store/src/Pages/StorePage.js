import React from 'react';
import Header from '../Components/Fields/Header';
import ProductTable from '../Components/Table/ProductTable';
import './StorePage.css';
import ReturnHomeButton from '../Components/ReturnHomeButton';

export default function StorePage() {
  return (
    <>
    <ReturnHomeButton />
    <div className="store-page-container">
      <Header />
      <ProductTable />
    </div>
    </>
  );
}
