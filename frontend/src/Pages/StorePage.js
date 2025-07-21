import React, { useState, useEffect } from 'react';
import Header from '../Components/Fields/Header';
import WrapTable from '../Components/Table/WrapTable';
import './StorePage.css';
import ReturnHomeButton from '../Components/ReturnHomeButton';
import { Alert } from 'react-bootstrap';

export default function StorePage() {
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    // Optionally auto-dismiss the message after a few seconds:
    const timer = setTimeout(() => setShowInfo(false), 7000); // 7 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ReturnHomeButton />
      <div className="store-page-container">
        <Header />
        
        {showInfo && (
          <Alert
            variant="info"
            dismissible
            onClose={() => setShowInfo(false)}
            className="text-center"
          >
            💡 Click on a row in the table to edit the product details.
          </Alert>
        )}

        <WrapTable />
      </div>
    </>
  );
}
