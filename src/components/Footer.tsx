import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3 }}>
      <Container>
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Insight Web Solutions. All rights reserved.
        </Typography>
        
      </Container>
    </Box>
  );
};

export default Footer;