import React from 'react';
import { 
  CircularProgress,
  Box,
  Typography,
  Backdrop
} from '@mui/material';

const Loader = ({ open, message = 'Загрузка...' }) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column',
        gap: 2
      }}
      open={open}
    >
      <CircularProgress color="inherit" size={60} />
      <Typography variant="h6">{message}</Typography>
      <Typography variant="body2" color="rgba(255,255,255,0.7)">
        Пожалуйста, подождите...
      </Typography>
    </Backdrop>
  );
};

export default Loader;