// src/sections/Portfolio.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import portfolioData from "../data/portfolio.json";

interface Project {
  title: string;
  description: string;
  role: string;
  tech: string[];
  link: string;
  desktop: string;
  mobile: string;
}

const Portfolio = () => {
  const projects: Project[] = portfolioData as Project[];

  return (
    <Box
      component="section"
      id="portfolio"
      aria-labelledby="portfolio-heading"
      tabIndex={-1}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.default", scrollMarginTop: { xs: 70, md: 90 },
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

        <Grid2 container spacing={4} mt={2}>
          {projects.map((project, index) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 12,
                    transform: "translateY(-8px)",
                  },
                }}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                {/* Screenshots */}
                <Box sx={{ position: "relative", height: 300, bgcolor: "#f5f5f5" }}>
                  <CardMedia
                    component="img"
                    image={project.desktop}
                    alt={`${project.title} - Desktop view`}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    itemProp="image"
                  />
                  <CardMedia
                    component="img"
                    image={project.mobile}
                    alt={`${project.title} - Mobile view`}
                    loading="lazy"
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      width: "35%",
                      borderRadius: 2,
                      boxShadow: 6,
                      border: "4px solid white",
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary.main"
                    fontWeight={700}
                    itemProp="name"
                  >
                    {project.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>

                  <Typography variant="caption" color="text.secondary" fontStyle="italic" display="block" mb={2}>
                    Role: {project.role}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
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
                  </Stack>
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
      </Container>
    </Box>
  );
};

export default Portfolio;