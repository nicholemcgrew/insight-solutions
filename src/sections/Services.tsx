// src/sections/Services.tsx
import React from 'react';
import { Box, Container, Typography, Grid2, Card, CardContent } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SearchIcon from '@mui/icons-material/Search';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import CollectionsIcon from '@mui/icons-material/Collections'; // Portfolio icon

const services = [
  {
    title: 'Web Development',
    description: 'Custom, responsive websites built with modern technologies for seamless desktop, tablet, and mobile experiences.',
    icon: <WebIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Accessibility Audits & Improvements',
    description: 'Ensure your website is inclusive with WCAG-compliant audits and tailored improvements for all users.',
    icon: <AccessibilityIcon fontSize="large" color="primary" />,
  },
  {
    title: 'SEO Audits',
    description: 'Optimize your site for search engines to drive traffic and improve visibility.',
    icon: <SearchIcon fontSize="large" color="primary" />,
  },
  {
    title: 'UX Improvements',
    description: 'Enhance user experience with data-driven, responsive designs for all devices.',
    icon: <DesignServicesIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Data Analytics',
    description: 'Unlock actionable insights with performance tracking, user behavior analysis, and custom dashboards.',
    icon: <AnalyticsIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Portfolio Building',
    description: 'Launch a professional, responsive portfolio in 7 days. SEO-optimized, WCAG-compliant, and built to convert.',
    icon: <CollectionsIcon fontSize="large" color="primary" />,
  },
];

const Services: React.FC = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }} id="services">
      <Container>
        <Typography variant="h2" align="center" gutterBottom color="text.primary">
          My Services
        </Typography>
        <Typography variant="body1" align="center" maxWidth="700px" mx="auto" gutterBottom color="text.secondary">
          From responsive web development to portfolio launches — I deliver results that grow your business.
        </Typography>

        <Grid2 container spacing={4} mt={2}>
          {services.map((service, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  bgcolor: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ mb: 2, mt: 1 }}>
                  {service.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography variant="h6" gutterBottom color="text.primary" fontWeight={600}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Services;