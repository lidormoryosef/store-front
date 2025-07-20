import React from 'react';
import Header from '../Components/Fields/Header';
import WrapTable from '../Components/Table/WrapTable';
import './StorePage.css';
import ReturnHomeButton from '../Components/ReturnHomeButton';

export default function StorePage() {
  return (
    <>
    <ReturnHomeButton />
    <div className="store-page-container">
      <Header />
      <WrapTable />
    </div>
    </>
  );
}
