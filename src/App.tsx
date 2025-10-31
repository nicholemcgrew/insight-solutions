// src/App.tsx
import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom"; // ← Only Routes & Route
import theme from "./theme";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Portfolio from "./sections/Portfolio";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import PricingPage from "./pages/PricingPage";

const App = () => {
  const [selectedService, setSelectedService] = useState<string>("");

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="canonical" href="https://insightwebsolutions.com" />
          <style>{`html { scroll-behavior: smooth; }`}</style>
        </Helmet>

        {/* SKIP LINK */}
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: "fixed",
            top: -9999,
            left: -9999,
            bg: "background.paper",
            color: "primary.main",
            p: 2,
            fontWeight: 600,
            zIndex: theme.zIndex.appBar + 2,
            borderRadius: 1,
            boxShadow: 3,
            transition: "all 0.2s ease",
            "&:focus": {
              top: 16,
              left: 16,
              outline: "3px solid",
              outlineColor: "secondary.main",
            },
          }}
          tabIndex={0}
          aria-label="Skip to main content"
        >
          Skip to main content
        </Box>

        {/* NO <BrowserRouter> HERE */}
        <Navbar />

        <Routes>
          {/* HOMEPAGE */}
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
                <main id="main-content" tabIndex={-1}>
                  <Hero />
                  <Services setSelectedService={setSelectedService} />
                  <Portfolio />
                  <About />
                  <Contact selectedService={selectedService} />
                  <Footer />
                </main>
              </>
            }
          />

          {/* PRICING PAGE */}
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
                <main id="main-content" tabIndex={-1}>
                  <PricingPage />
                  <Footer />
                </main>
              </>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <main id="main-content" style={{ padding: "2rem", textAlign: "center" }}>
                <h1>404 - Page Not Found</h1>
                <p><a href="/">Return Home</a></p>
              </main>
            }
          />
        </Routes>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;