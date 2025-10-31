// src/sections/Hero.tsx
import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

const Hero = () => {
  return (
    <Box
      component="header"
      role="banner"
      id="home"
      aria-labelledby="hero-heading"
      tabIndex={-1}
      sx={{
        bgcolor: "primary.main",
        color: "white",
        minHeight: "100dvh",
        pt: { xs: 10, md: 12 }, // Clear sticky navbar (~64px)
        pb: { xs: 8, md: 10 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <Container maxWidth="lg">
        <Typography
          id="hero-heading"
          variant="h1"
          gutterBottom
          sx={{
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            fontWeight: 800,
            lineHeight: 1.2,
            mb: 3,
          }}
          itemProp="headline"
        >
          Build Your Dream Website
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            maxWidth: "800px",
            mx: "auto",
            mb: 5,
            opacity: 0.95,
          }}
          itemProp="description"
        >
          Affordable web development, accessibility, SEO, UX, and data analytics by{" "}
          <Box component="span" itemProp="author" itemScope itemType="https://schema.org/Organization">
            <Box component="span" itemProp="name">Insight Web Solutions</Box>
          </Box>
          .
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 1.5, md: 2 },
            justifyContent: "center",
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="View pricing plans"
            sx={{
              minWidth: 200,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              "&:focus-visible": {
                outline: "3px solid white",
                outlineOffset: "2px",
              },
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
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Get started with a free consultation"
            sx={{
              minWidth: 200,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              "&:focus-visible": {
                outline: "3px solid white",
                outlineOffset: "2px",
              },
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