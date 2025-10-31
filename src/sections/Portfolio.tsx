// src/sections/Portfolio.tsx
import React from 'react';
import { Box, Container, Typography, Grid2, Card, CardContent, Button, CardMedia, Chip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const projects = [
  {
    title: 'EPA Energy Star Product Finder',
    description: 'Full-stack rebuild for the U.S. EPA using React, TypeScript, and Vite. Transformed legacy code into a modern, responsive, WCAG 2.2 AA compliant app with Figma-driven UI, REST API integration, reusable components, and optimized SEO/performance.',
    role: 'Sole Developer – Full Rebuild',
    tech: ['React', 'TypeScript', 'Vite', 'Figma', 'REST API', 'WCAG 2.2'],
    link: 'https://www.energystar.gov/productfinder/',
    desktop: 'https://via.placeholder.com/600x400/1565C0/FFFFFF?text=EPA+Product+Finder+%E2%80%94+Desktop',
    mobile: 'https://via.placeholder.com/200x400/F9A825/1565C0?text=Mobile',
  },
  {
    title: 'Personal Portfolio (Template)',
    description: 'A responsive, mobile-first portfolio showcasing UX/UI design, built with React and CSS. Optimized for SEO, accessibility, and performance — serves as a customizable template for clients.',
    role: 'Designer & Developer',
    tech: ['React', 'CSS', 'Responsive', 'SEO', 'WCAG'],
    link: 'https://nicholemcgrew.netlify.app/',
    desktop: 'https://via.placeholder.com/600x400/F9A825/1565C0?text=Portfolio+%E2%80%94+Desktop',
    mobile: 'https://via.placeholder.com/200x400/1565C0/FFFFFF?text=Mobile',
  },
];

const Portfolio: React.FC = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }} id="portfolio">
      <Container>
        <Typography variant="h2" align="center" gutterBottom color="text.primary">
          My Portfolio
        </Typography>
        <Typography variant="body1" align="center" maxWidth="700px" mx="auto" gutterBottom color="text.secondary">
          Real projects. Real results. From government-scale rebuilds to portfolio templates — I build sites that perform, convert, and scale.
        </Typography>

        <Grid2 container spacing={4} mt={2}>
          {projects.map((project, index) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ bgcolor: 'white', boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'relative', p: 2, bgcolor: '#f9f9f9' }}>
                  <Box
                    component="img"
                    src={project.desktop}
                    alt={`${project.title} - Desktop`}
                    sx={{ width: '100%', borderRadius: 1, boxShadow: 1 }}
                  />
                  <Box
                    component="img"
                    src={project.mobile}
                    alt={`${project.title} - Mobile`}
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      width: '35%',
                      borderRadius: 1,
                      boxShadow: 2,
                      border: '4px solid white',
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom color="primary.main" fontWeight={600}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontStyle="italic">
                    Role: {project.role}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {project.tech.map((tech, i) => (
                      <Chip key={i} label={tech} size="small" color="secondary" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    endIcon={<OpenInNewIcon />}
                  >
                    View Live Project
                  </Button>
                </Box>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Portfolio;