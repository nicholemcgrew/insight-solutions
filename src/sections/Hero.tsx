// src/sections/Hero.tsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        minHeight: { xs: '100vh', md: '80vh' }, // Full screen on mobile
        // py: { xs: , md: 6 },                  // More padding on mobile
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
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

        {/* CTA 1: Pricing */}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component="a"
          href="#pricing"  // ← FIXED: #pricing, not /pricing
          sx={{ mt: 3, mx: 1 }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          View Pricing Plans
        </Button>

        {/* CTA 2: Contact */}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component="a"
          href="#contact"
          sx={{ mt: 3, mx: 1 }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;