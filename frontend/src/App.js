import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AddProductPage from './Pages/AddProductPage';
import StorePage from './Pages/StorePage';

function App() {
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
