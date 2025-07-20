import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page d-flex vh-100 bg-light align-items-center justify-content-center">
      <div className="home-card card shadow-lg p-5">
        <div className="home-header text-center mb-4">
          <img src={Logo} alt="Logo" className="home-logo mx-auto d-block" />
          <h2 className="fw-bold home-title">Welcome to Product Manager</h2>
          <p className="text-muted home-subtitle">Manage your products efficiently</p>
        </div>

        <div className="d-grid gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/add')}
          >
            ➕ Add Product
          </button>
          <button
            className="btn btn-outline-secondary btn-lg"
            onClick={() => navigate('/store')}
          >
            🏬 View Store
          </button>
        </div>
      </div>
    </div>
  );
}
