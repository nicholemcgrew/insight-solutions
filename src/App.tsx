import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route, Link as RouterLink } from "react-router-dom";

import theme from "./theme/theme";
import Navbar from "./components/sections/Navbar";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import PricingPage from "./pages/PricingPage";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/services/Services";
import Portfolio from "./components/sections/Portfolio";

// Temporarily removed from public routes
// import WebsiteBuilderPage from "./pages/WebsiteBuilderPage";

import ScrollToHash from "./components/ScrollToHash";
import "@google/model-viewer";

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Global SEO */}
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="canonical" href="https://insightwebsolutions.com" />
        </Helmet>

        {/* Accessibility skip link */}
        <Box
          component="a"
          href="#main-content"
          aria-label="Skip to main content"
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
        >
          Skip to main content
        </Box>

        <Navbar />

        {/* Handles hash navigation and route-based scroll reset */}
        <ScrollToHash />

        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>
                    Insight Web Solutions | Web Development, Accessibility, SEO
                  </title>
                  <meta
                    name="description"
                    content="Professional web development, accessibility, SEO, UX, and analytics."
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

          {/* Pricing */}
          <Route
            path="/pricing"
            element={
              <>
                <Helmet>
                  <title>Pricing | Insight Web Solutions</title>
                  <meta
                    name="description"
                    content="Transparent pricing for web development and analytics services."
                  />
                </Helmet>

                <Box component="main" id="main-content" tabIndex={-1}>
                  <PricingPage />
                  <Footer />
                </Box>
              </>
            }
          />

          {/* Website Builder intentionally disabled */}
          {/*
          <Route
            path="/builder"
            element={
              <>
                <Helmet>
                  <title>Website Builder | Insight Web Solutions</title>
                </Helmet>

                <Box component="main" id="main-content" tabIndex={-1}>
                  <WebsiteBuilderPage />
                  <Footer />
                </Box>
              </>
            }
          />
          */}

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
                  }}
                >
                  <Container maxWidth="sm" sx={{ textAlign: "center" }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 1.5 }}>
                      404 — Page Not Found
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4 }}>
                      That page doesn’t exist.
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
