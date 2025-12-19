// src/sections/Hero.tsx
import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <Box
      component="header"
      role="banner"
      id="home"
      aria-labelledby="hero-heading"
      tabIndex={-1}
      sx={(t) => ({
        bgcolor: "primary.main",
        color: "primary.contrastText",
        minHeight: "100dvh",
        pt: { xs: 12, md: 14 },
        pb: { xs: 9, md: 12 },
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: { xs: 84, md: 104 },
        // Subtle depth without depending on images
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `radial-gradient(900px 600px at 50% 15%, ${t.palette.secondary.main}33, transparent 60%)`,
          pointerEvents: "none",
        },
      })}
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack spacing={{ xs: 3, md: 4 }} alignItems="center">
          {/* SEO: Real H1 */}
          <Typography
            id="hero-heading"
            component="h1"
            variant="h1"
            gutterBottom={false}
            sx={{
              fontSize: { xs: "2.6rem", sm: "3.4rem", md: "4.25rem" },
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: 0.2,
              maxWidth: 980,
            }}
            itemProp="headline"
          >
            Build a Website That Looks Premium—and Converts
          </Typography>

          <Typography
            component="p"
            variant="h5"
            sx={{
              fontSize: { xs: "1.15rem", sm: "1.25rem", md: "1.35rem" },
              lineHeight: 1.7,
              maxWidth: 920,
              opacity: 0.95,
            }}
            itemProp="description"
          >
            Affordable web development, accessibility (WCAG/508), SEO, UX improvements, and data analytics by{" "}
            <Box
              component="span"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Organization"
              sx={{ fontWeight: 900 }}
            >
              <Box component="span" itemProp="name">
                Insight Web Solutions
              </Box>
            </Box>
            .
          </Typography>

          {/* CTA Buttons */}
          <Box
            component="nav"
            aria-label="Primary hero calls to action"
            sx={{
              display: "flex",
              gap: { xs: 2, md: 2.5 },
              justifyContent: "center",
              flexWrap: "wrap",
              mt: { xs: 1, md: 1.5 },
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={NavLink}
              to="/pricing"
              aria-label="View pricing plans"
              sx={{
                minWidth: { xs: 240, sm: 260 },
                py: 1.8,
                fontWeight: 900,
                fontSize: { xs: "1.05rem", sm: "1.1rem" },
                textTransform: "none",
                borderRadius: 2,
                "&:focus-visible": {
                  outline: "3px solid",
                  outlineColor: "primary.contrastText",
                  outlineOffset: 3,
                },
              }}
            >
              View Pricing Plans
            </Button>

            <Button
              component="a"
              href="/?cta=true#contact"
              variant="outlined"
              color="inherit"
              size="large"
              aria-label="Get started with a free consultation"
              sx={(t) => ({
                minWidth: { xs: 240, sm: 260 },
                py: 1.8,
                fontWeight: 900,
                fontSize: { xs: "1.05rem", sm: "1.1rem" },
                textTransform: "none",
                borderRadius: 2,
                borderWidth: 2,
                borderColor: "primary.contrastText",
                color: "primary.contrastText",
                bgcolor: "transparent",
                "&:hover": {
                  borderWidth: 2,
                  borderColor: "primary.contrastText",
                  bgcolor: `${t.palette.common.white}1A`,
                },
                "&:focus-visible": {
                  outline: "3px solid",
                  outlineColor: "primary.contrastText",
                  outlineOffset: 3,
                },
              })}
            >
              Get Started
            </Button>
          </Box>

          {/* Small supportive line (readable, helpful, not tiny) */}
          <Typography
            component="p"
            sx={{
              mt: { xs: 1, md: 1.5 },
              fontSize: { xs: "1rem", sm: "1.05rem" },
              opacity: 0.95,
              maxWidth: 900,
            }}
          >
            Fast turnarounds. Clean, modern design. Accessibility-first.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
