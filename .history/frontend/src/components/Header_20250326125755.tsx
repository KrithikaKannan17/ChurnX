import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <AnalyticsIcon sx={{ mr: 2 }} />
        <Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Customer Churn Prediction
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            Predict customer churn probability using machine learning
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 