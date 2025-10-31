import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box sx={{ py: 4 }} id="about">
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" align="center" maxWidth="600px" mx="auto">
          I’m Nichole, the creative force behind Insight Web Solutions. Specializing in web development, WCAG-compliant accessibility audits and improvements, SEO, UX enhancements, and data analytics, I deliver tailored solutions to elevate your online presence. Stay tuned for upcoming AWS and cybersecurity services as I expand my expertise!
        </Typography>
      </Container>
    </Box>
  );
};

export default About;