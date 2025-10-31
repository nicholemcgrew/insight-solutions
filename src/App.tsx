// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import theme from './theme';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import PricingPage from './pages/PricingPage';

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <main id="main-content">
      <HelmetProvider>
        <Helmet>{/* ... */}</Helmet>

        <ThemeProvider theme={theme}>
          <Navbar />
          <Hero />
          <Services setSelectedService={setSelectedService} />
          <Portfolio />
          <PricingPage />     {/* ← ONLY NEW PRICING */}
          <About />
          <Contact selectedService={selectedService} />
          <Footer />
        </ThemeProvider>
      </HelmetProvider>
    </main>
  );
};