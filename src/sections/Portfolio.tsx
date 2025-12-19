// src/sections/Portfolio.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
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

const clampLines = (lines: number) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
});

const Portfolio = () => {
  const projects = portfolioData as Project[];

  return (
    <Box
      component="section"
      id="portfolio"
      aria-labelledby="portfolio-heading"
      tabIndex={-1}
      sx={{ py: { xs: 8, md: 10 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="portfolio-heading"
          variant="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 900, mb: 3, fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3rem" } }}
        >
          My Portfolio
        </Typography>

        <Grid2 container spacing={{ xs: 3, md: 4 }} mt={2}>
          {projects.map((project, i) => {
            const isEnergyStar =
              project.title.toLowerCase().includes("energy star") ||
              project.link.includes("energystar.gov");

            return (
              <Grid2 size={{ xs: 12, md: 6 }} key={i}>
                <Card
                  sx={{
                    // Keep each card from turning into a skyscraper on laptops
                    height: { xs: "auto", md: "min(72vh, 620px)" },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: "hidden",
                    transition: "0.25s",
                    "&:hover": { boxShadow: 10, transform: "translateY(-6px)" },
                  }}
                >
                  {/* IMAGE AREA (shorter so card fits on one screen) */}
                  <Box
                    sx={{
                      position: "relative",
                      // Smaller + responsive: saves vertical space
                      height: isEnergyStar
                        ? { xs: 210, sm: 240, md: 220 }
                        : { xs: 190, sm: 220, md: 210 },
                      bgcolor: "#f5f5f5",
                      overflow: "hidden",
                    }}
                  >
                    {/* DESKTOP IMAGE */}
                    <CardMedia
                      component="img"
                      image={project.desktop}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: isEnergyStar ? "cover" : "contain",
                        objectPosition: isEnergyStar ? "center top" : "center",
                        // Portfolio image stays the same “perfect” behavior (contain + maxWidth)
                        maxWidth: isEnergyStar ? "none" : 600,
                        mx: isEnergyStar ? "unset" : "auto",
                      }}
                    />

                    {/* MOBILE IMAGE (a bit smaller so it doesn't force height) */}
                    <CardMedia
                      component="img"
                      image={project.mobile}
                      alt={`${project.title} mobile screenshot`}
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        bottom: { xs: 12, sm: 14 },
                        right: { xs: 12, sm: 14 },
                        width: { xs: "28%", sm: "22%" },
                        maxWidth: 150,
                        borderRadius: 2,
                        boxShadow: 6,
                        border: "3px solid white",
                        objectFit: "contain",
                        bgcolor: "white",
                      }}
                    />
                  </Box>

                  {/* CONTENT (clamped + scrollable chip row) */}
                  <CardContent
                    sx={{
                      flex: "1 1 auto",
                      p: { xs: 2.5, sm: 3 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.25,
                      minHeight: 0, // important for overflow children
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="primary.main"
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "1.2rem", sm: "1.3rem" },
                        lineHeight: 1.2,
                        ...clampLines(2),
                      }}
                    >
                      {project.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.05rem" },
                        lineHeight: 1.6,
                        ...clampLines(4), // keeps height predictable
                      }}
                    >
                      {project.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        fontSize: { xs: "0.98rem", sm: "1rem" },
                        ...clampLines(1),
                      }}
                    >
                      Role: {project.role}
                    </Typography>

                    {/* Chips: keep the card short by making this row scroll horizontally on desktop */}
                    <Box
                      sx={{
                        mt: 0.5,
                        overflowX: "auto",
                        overflowY: "hidden",
                        WebkitOverflowScrolling: "touch",
                        pb: 0.5,
                        // nicer scrollbar behavior
                        "&::-webkit-scrollbar": { height: 8 },
                        "&::-webkit-scrollbar-thumb": { borderRadius: 8 },
                      }}
                      aria-label={`${project.title} technologies`}
                    >
                      <Stack direction="row" spacing={1} sx={{ width: "max-content" }}>
                        {project.tech.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            color="secondary"
                            variant="outlined"
                            sx={{
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              height: 30,
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* CTA pinned to bottom via spacer */}
                    <Box sx={{ flexGrow: 1 }} />
                  </CardContent>

                  <Box sx={{ p: { xs: 2.5, sm: 3 }, pt: 0 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      endIcon={<OpenInNewIcon />}
                      sx={{
                        py: 1.25,
                        fontWeight: 900,
                        textTransform: "none",
                        borderRadius: 2,
                        "&:focus-visible": {
                          outline: "3px solid",
                          outlineColor: "primary.main",
                          outlineOffset: 3,
                        },
                      }}
                    >
                      View Live Project
                    </Button>
                  </Box>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Portfolio;
