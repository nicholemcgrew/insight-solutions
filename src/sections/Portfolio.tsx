// src/sections/Portfolio.tsx
import React from "react";
import {
  Box,
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

const HEADER_OFFSET = 96;

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
  const projects = portfolioData as Project[];

  return (
    <Box
      component="section"
      id="portfolio"
      aria-labelledby="portfolio-heading"
      tabIndex={-1}
      sx={{
        minHeight: `calc(100dvh - ${HEADER_OFFSET}px)`,
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1600, mx: "auto" }}>
        <Typography
          id="portfolio-heading"
          component="h2"
          align="center"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
            mb: 4,
          }}
        >
          Portfolio
        </Typography>

        <Grid2 container spacing={{ xs: 3, md: 3 }}>
          {projects.map((project) => {
            const title = project.title.toLowerCase();

            // Keep your portfolio image EXACTLY how it was (contain)
            const isPersonalPortfolio = title.includes("my personal portfolio");

            // These should fill 100% of the image area (cover)
            const isFullBleed =
              !isPersonalPortfolio &&
              (title.includes("energy star") ||
                title.includes("rose salon") ||
                project.link.includes("energystar.gov") ||
                project.link.includes("rose-salon.netlify.app"));

            // Card sizing tuned for 3-across on desktop
            const CARD_HEIGHT = 500;
            const IMAGE_HEIGHT = 250;

            return (
              <Grid2 key={project.title} size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    height: CARD_HEIGHT,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: 6,
                    transition: "0.25s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 12,
                    },
                  }}
                >
                  {/* IMAGE */}
                  <Box sx={{ position: "relative", height: IMAGE_HEIGHT }}>
                    <CardMedia
                      component="img"
                      image={project.desktop}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "#f5f5f5",

                        // ✅ Portfolio stays perfect (contain)
                        // ✅ Others fill 100% (cover)
                        objectFit: isFullBleed ? "cover" : "contain",

                        // ✅ Show the TOP of the page (beginning) instead of the middle/end
                        // When using cover, this controls what part gets cropped in.
                        objectPosition: isFullBleed ? "center top" : "center",
                      }}
                    />

                    <CardMedia
                      component="img"
                      image={project.mobile}
                      alt={`${project.title} mobile screenshot`}
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        bottom: 14,
                        right: 14,
                        width: "26%",
                        maxWidth: 120,
                        borderRadius: 2,
                        border: "3px solid white",
                        boxShadow: 6,
                        bgcolor: "white",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* CONTENT */}
                  <CardContent
                    sx={{
                      flex: 1,
                      px: 2.5,
                      py: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.9,
                      minHeight: 0,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: "italic",
                        opacity: 0.8,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.role}
                    </Typography>

                    {/* TECH — single row, scrollable */}
                    <Box sx={{ overflowX: "auto", pb: 0.5 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ width: "max-content" }}
                        aria-label={`${project.title} technologies`}
                      >
                        {project.tech.slice(0, 8).map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            color="secondary"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                      variant="contained"
                      color="secondary"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<OpenInNewIcon />}
                      sx={{
                        fontWeight: 700,
                        textTransform: "none",
                        borderRadius: 2,
                      }}
                    >
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Portfolio;
