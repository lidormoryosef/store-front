import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AddProductPage from './Pages/AddProductPage';
import StorePage from './Pages/StorePage';

function App() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // This is needed for most browsers to show the confirmation dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/store" element={<StorePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
