// src/App.tsx
import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-scroll";
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
          
          {/* Primary SEO */}
          <title>Insight Web Solutions | Web Development, Accessibility, SEO & UX</title>
          <meta
            name="description"
            content="Professional web development, WCAG-compliant accessibility, SEO, UX design, and data analytics. Build fast, accessible, high-converting websites."
          />
          <link rel="canonical" href="https://insightwebsolutions.com" />

          {/* Open Graph / Social */}
          <meta property="og:title" content="Insight Web Solutions" />
          <meta
            property="og:description"
            content="Web development, accessibility, SEO, and UX by Nichole McGrew."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://insightwebsolutions.com" />
          <meta property="og:image" content="https://insightwebsolutions.com/og-image.jpg" />
          <meta property="og:site_name" content="Insight Web Solutions" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Insight Web Solutions" />
          <meta name="twitter:description" content="Web dev, accessibility, SEO, UX." />
          <meta name="twitter:image" content="https://insightwebsolutions.com/og-image.jpg" />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Smooth Scroll */}
          <style>{`html { scroll-behavior: smooth; }`}</style>
        </Helmet>

        {/* SKIP LINK — MUST BE FIRST TABBABLE */}
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: "absolute",
            top: -9999,
            left: -9999,
            bg: "white",
            color: "primary.main",
            p: 2,
            fontWeight: 600,
            zIndex: theme.zIndex.appBar + 2,
            borderRadius: 1,
            boxShadow: 3,
            "&:focus": {
              top: 16,
              left: 16,
            },
          }}
        >
          Skip to main content
        </Box>

        <main id="main-content" tabIndex={-1}>
          <Navbar />
          <Hero />
          <Services setSelectedService={setSelectedService} />
          <Portfolio />
          <PricingPage />
          <About />
          <Contact selectedService={selectedService} />
          <Footer />
        </main>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;