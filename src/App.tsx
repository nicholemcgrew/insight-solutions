// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import theme from './theme';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Pricing from './sections/Pricing';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  // ← MOVE useState INSIDE the component
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <main id="main-content">
      <HelmetProvider>
        <Helmet>
          <title>Insight Web Solutions</title>
          <meta
            name="description"
            content="Expert web development, accessibility audits and improvements, SEO, UX, and data analytics services by Insight Web Solutions."
          />
          <meta name="keywords" content="web development, accessibility audit, accessibility improvements, SEO audit, UX audit, data analytics, Insight Web Solutions" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Insight Web Solutions",
              "description": "Expert web development, accessibility audits and improvements, SEO, UX, and data analytics services.",
              "url": "https://insight-web-solutions.netlify.app",
              "sameAs": ["https://nicholemcgrew.netlify.app/"]
            })}
          </script>
        </Helmet>

        <ThemeProvider theme={theme}>
          <Navbar />
          <Hero />
          {/* ← PASS THE FUNCTION */}
          <Services setSelectedService={setSelectedService} />
          <Pricing />
          <Portfolio />
          <About />
          <Contact selectedService={selectedService} />
          <Footer />
        </ThemeProvider>
      </HelmetProvider>
    </main>
  );
};

export default App;