// src/sections/Hero.tsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        minHeight: '100dvh',           // ← NEW: Dynamic viewport (excludes navbar)
        pt: { xs: 2, md: 5 },        // ← Push content below navbar
        pb: { xs: 6, md: 8 },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Pricing Plans
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;