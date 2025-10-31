// src/sections/Portfolio.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  Button,
  CardMedia,
  Chip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const projects = [
  {
    title: "EPA Energy Star Product Finder",
    description:
      "Full-stack rebuild for the U.S. EPA using React, TypeScript, and Vite. Transformed legacy code into a modern, responsive, WCAG 2.2 AA compliant app with Figma-driven UI, REST API integration, reusable components, and optimized SEO/performance.",
    role: "Sole Developer – Full Rebuild",
    tech: ["React", "TypeScript", "Vite", "Figma", "REST API", "WCAG 2.2"],
    link: "https://www.energystar.gov/productfinder/",
    desktop: "https://via.placeholder.com/600x400/1565C0/FFFFFF?text=EPA+Product+Finder+%E2%80%94+Desktop",
    mobile: "https://via.placeholder.com/200x400/F9A825/1565C0?text=Mobile",
  },
  {
    title: "Personal Portfolio (Template)",
    description:
      "A responsive, mobile-first portfolio showcasing UX/UI design, built with React and CSS. Optimized for SEO, accessibility, and performance — serves as a customizable template for clients.",
    role: "Designer & Developer",
    tech: ["React", "CSS", "Responsive", "SEO", "WCAG"],
    link: "https://nicholemcgrew.netlify.app/",
    desktop: "https://via.placeholder.com/600x400/F9A825/1565C0?text=Portfolio+%E2%80%94+Desktop",
    mobile: "https://via.placeholder.com/200x400/1565C0/FFFFFF?text=Mobile",
  },
];

const Portfolio = () => {
  return (
    <Box
      component="section"
      id="portfolio"
      aria-labelledby="portfolio-heading"
      tabIndex={-1}
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "background.default",
      }}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <Container maxWidth="lg">
        <Typography
          id="portfolio-heading"
          variant="h2"
          align="center"
          gutterBottom
          color="text.primary"
          sx={{ fontWeight: 700, mb: 3 }}
          itemProp="name"
        >
          My Portfolio
        </Typography>

        <Typography
          variant="body1"
          align="center"
          maxWidth="800px"
          mx="auto"
          paragraph
          color="text.secondary"
          itemProp="description"
        >
          Real projects. Real results. From government-scale rebuilds to portfolio templates — I build sites that perform, convert, and scale.
        </Typography>

        <Box
          component="ul"
          role="list"
          aria-label="Portfolio projects"
          sx={{ listStyle: "none", p: 0, m: 0 }}
        >
          <Grid2 container spacing={{ xs: 3, md: 4 }} component="li">
            {projects.map((project, index) => (
              <Grid2 size={{ xs: 12, md: 6 }} key={index} component="li" role="listitem">
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    minHeight: { xs: 520, md: 560 },
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: 8,
                      transform: "translateY(-8px)",
                    },
                    "&:focus-visible": {
                      outline: "3px solid",
                      outlineColor: "secondary.main",
                      outlineOffset: "2px",
                    },
                  }}
                  tabIndex={0}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  {/* Screenshots */}
                  <Box sx={{ position: "relative", p: 3, bgcolor: "#f5f5f5" }}>
                    <Box
                      component="img"
                      src={project.desktop}
                      alt={`Desktop view of ${project.title} project`}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                      itemProp="image"
                    />
                    <Box
                      component="img"
                      src={project.mobile}
                      alt={`Mobile view of ${project.title} project`}
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        bottom: 24,
                        right: 24,
                        width: { xs: "40%", md: "35%" },
                        borderRadius: 2,
                        boxShadow: 4,
                        border: "5px solid white",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3, pt: 2 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      color="primary.main"
                      fontWeight={700}
                      itemProp="name"
                    >
                      {project.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{ flexGrow: 1 }}
                      itemProp="description"
                    >
                      {project.description}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontStyle="italic"
                      display="block"
                      mb={2}
                      itemProp="author"
                    >
                      Role: {project.role}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                      {project.tech.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          color="secondary"
                          variant="outlined"
                          sx={{ fontSize: "0.75rem" }}
                        />
                      ))}
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      endIcon={<OpenInNewIcon />}
                      aria-label={`View live ${project.title} project (opens in new tab)`}
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: "none",
                        "&:focus-visible": {
                          outline: "3px solid white",
                          outlineOffset: "2px",
                        },
                      }}
                      itemProp="url"
                    >
                      View Live Project
                    </Button>
                  </Box>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};

export default Portfolio;