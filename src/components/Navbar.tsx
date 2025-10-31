import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          Insight Web Solutions
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="home" smooth duration={500} aria-label="Navigate to home section">
            Home
          </Button>
          <Button color="inherit" component={Link} to="services" smooth duration={500} aria-label="Navigate to services section">
            Services
          </Button>
          <Button color="inherit" component={Link} to="pricing" smooth duration={500} aria-label="Navigate to pricing section">
            Pricing
          </Button>
          <Button color="inherit" component={Link} to="portfolio" smooth duration={500} aria-label="Navigate to portfolio section">
            Portfolio
          </Button>
          <Button color="inherit" component={Link} to="about" smooth duration={500} aria-label="Navigate to about section">
            About
          </Button>
          <Button color="inherit" component={Link} to="contact" smooth duration={500} aria-label="Navigate to contact section">
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;