import React from 'react';
import { Avatar, Typography } from '@mui/material';
import Logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <div className="store-header">
      <Avatar src={Logo} className="store-logo" />
      <Typography variant="h4" className="store-title">
        Fruit and Vegetable store
      </Typography>
    </div>
  );
}
