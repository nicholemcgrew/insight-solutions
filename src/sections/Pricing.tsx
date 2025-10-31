import React from 'react';
import { Box, Container, Typography, Grid2, Card, CardContent, CardHeader, CardActions, Button } from '@mui/material';

const pricingTiers = [
  {
    title: 'Web Development',
    tiers: [
      { name: 'Basic', price: '$700–$3,000', description: 'Simple static site (5–10 pages), responsive design.' },
      { name: 'Standard', price: '$3,000–$7,500', description: 'Custom responsive site (10–50 pages), basic integrations.' },
      { name: 'Premium', price: 'Custom Quote', description: 'Advanced site with e-commerce, API integrations, ongoing maintenance.' },
    ],
  },
  {
    title: 'Accessibility Audits & Improvements',
    tiers: [
      { name: 'Basic Audit', price: '$1,000–$2,000', description: 'WCAG 2.2 AA audit for 10–20 pages.' },
      { name: 'Standard', price: '$2,000–$3,500', description: 'Full audit + basic fixes for 20–50 pages.' },
      { name: 'Premium', price: 'Custom Quote', description: 'Comprehensive audit, full remediation, and user testing.' },
    ],
  },
  {
    title: 'SEO Audits',
    tiers: [
      { name: 'Basic', price: '$350–$1,000', description: 'Technical scan + keyword analysis for small sites.' },
      { name: 'Standard', price: '$1,000–$2,000', description: 'Full on-page/off-page audit + competitor analysis.' },
      { name: 'Premium', price: 'Custom Quote', description: 'Deep audit with implementation roadmap and monthly monitoring.' },
    ],
  },
  {
    title: 'UX Improvements',
    tiers: [
      { name: 'Basic', price: '$700–$1,200', description: 'Heuristic review + wireframe suggestions for key flows.' },
      { name: 'Standard', price: '$1,200–$2,000', description: 'Full UX audit + prototypes for 5–10 screens.' },
      { name: 'Premium', price: 'Custom Quote', description: 'Audit, redesign, user testing, and A/B variants.' },
    ],
  },
  {
    title: 'Data Analytics',
    tiers: [
      { name: 'Basic', price: '$700–$2,000', description: 'One-time dashboard setup + basic reporting.' },
      { name: 'Standard', price: '$2,000–$6,000', description: 'Custom analysis + monthly insights for small datasets.' },
      { name: 'Premium', price: 'Custom Quote', description: 'Ongoing analytics, predictive modeling, and AI integration.' },
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }} id="pricing">
      <Container>
        <Typography variant="h2" align="center" gutterBottom color="text.primary">
          Transparent Pricing
        </Typography>
        <Typography variant="body1" align="center" maxWidth="600px" mx="auto" gutterBottom color="text.secondary">
          Introductory rates for new clients! First project: 10% off. Bundle services for 20% off. Contact for custom quotes.
        </Typography>
        <Grid2 container spacing={4}>
          {pricingTiers.map((service, index) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ bgcolor: 'white', boxShadow: 2 }}>
                <CardHeader
                  title={
                    <Typography variant="h5" color="primary.main">
                      {service.title}
                    </Typography>
                  }
                />
                <CardContent>
                  {service.tiers.map((tier, tierIndex) => (
                    <Box key={tierIndex} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                      <Typography variant="h6" color="text.primary">{tier.name}</Typography>
                      <Typography variant="h4" color="secondary.main" gutterBottom>{tier.price}</Typography>
                      <Typography variant="body2" color="text.secondary">{tier.description}</Typography>
                    </Box>
                  ))}
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button variant="contained" color="secondary" href="#contact" size="large">
                    Get Quote
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Pricing;