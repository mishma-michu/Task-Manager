import React from 'react';
import { Box } from '@mui/material';

export default function Modal({ children, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <Box
        onClick={e => e.stopPropagation()}
        sx={{
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: 2,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {children}
      </Box>
    </div>
  );
}
