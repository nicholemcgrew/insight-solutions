import React from "react";
import { ThemeProvider, CssBaseline, Box, Container, Typography, Button } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route, Link as RouterLink } from "react-router-dom";

import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Portfolio from "./sections/Portfolio";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import PricingPage from "./pages/PricingPage";

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Global SEO / meta */}
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="canonical" href="https://insightwebsolutions.com" />
        </Helmet>

        {/* Skip link (508) */}
        <Box
          component="a"
          href="#main-content"
          sx={(t) => ({
            position: "fixed",
            top: -9999,
            left: 16,
            bgcolor: "background.paper",
            color: "text.primary",
            px: 2,
            py: 1.25,
            fontWeight: 800,
            borderRadius: 2,
            boxShadow: 6,
            zIndex: t.zIndex.appBar + 2,
            transition: "top 0.2s ease",
            "&:focus": {
              top: 16,
              outline: `3px solid ${t.palette.secondary.main}`,
              outlineOffset: 2,
            },
          })}
          aria-label="Skip to main content"
        >
          Skip to main content
        </Box>

        <Navbar />

        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Insight Web Solutions | Web Development, Accessibility, SEO</title>
                  <meta
                    name="description"
                    content="Professional web development, WCAG-compliant accessibility, SEO, UX, and data analytics."
                  />
                </Helmet>

                <Box component="main" id="main-content" tabIndex={-1}>
                  <Hero />
                  <Services />
                  <Portfolio />
                  <About />
                  <Contact />
                  <Footer />
                </Box>
              </>
            }
          />

          {/* PRICING */}
          <Route
            path="/pricing"
            element={
              <>
                <Helmet>
                  <title>Pricing | Insight Web Solutions</title>
                  <meta
                    name="description"
                    content="Transparent pricing for web development, accessibility, SEO, UX, and analytics."
                  />
                </Helmet>

                <Box component="main" id="main-content" tabIndex={-1}>
                  <PricingPage />
                  <Footer />
                </Box>
              </>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <>
                <Helmet>
                  <title>404 | Insight Web Solutions</title>
                  <meta name="robots" content="noindex" />
                </Helmet>

                <Box
                  component="main"
                  id="main-content"
                  tabIndex={-1}
                  sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    py: { xs: 8, md: 12 },
                    bgcolor: "background.default",
                  }}
                >
                  <Container maxWidth="sm" sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h2"
                      component="h1"
                      sx={{ fontWeight: 900, mb: 1.5 }}
                    >
                      404 — Page Not Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      That page doesn’t exist. Use the button below to go back home.
                    </Typography>
                    <Button
                      component={RouterLink}
                      to="/"
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{ fontWeight: 800 }}
                    >
                      Return Home
                    </Button>
                  </Container>
                </Box>

                <Footer />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
