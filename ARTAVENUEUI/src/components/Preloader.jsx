import React from 'react';
import { CircularProgress } from '@mui/material';

const Preloader = () => {
  const preloaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full height of the viewport
  };

  return (
    <div style={preloaderStyle}>
      <CircularProgress />
    </div>
  );
};

export default Preloader;
