import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 8,
        textAlign: 'center',
      }}
      id="home"
    >
      <Container>
        <Typography variant="h1" gutterBottom>
          Build Your Dream Website
        </Typography>
        <Typography variant="h5" gutterBottom>
          Affordable web development, accessibility, SEO, UX, and data analytics by Insight Web Solutions.
        </Typography>
        <Button variant="contained" color="secondary" size="large" href="#contact">
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;