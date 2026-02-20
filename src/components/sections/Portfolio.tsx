import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // ← fixed import
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useMemo, useState } from "react";

import portfolioData from "../../data/portfolioData.json";

const HEADER_OFFSET = 96;

interface Project {
  title: string;
  description: string;
  role: string;
  tech: string[];
  link: string;
  desktop: string;
  mobile?: string | null;
  desktop2x?: string;
  mobile2x?: string;
}

function getMobileOverlayObjectPosition(projectTitle: string): string {
  const t = projectTitle.toLowerCase();
  if (t.includes("my personal portfolio")) return "center 18%";
  return "center top";
}

function getDesktopObjectPosition(_projectTitle: string): string {
  return "center top";
}

const Portfolio = () => {
  const projects = portfolioData as Project[];

  const [failedMobileByTitle, setFailedMobileByTitle] = useState<
    Record<string, boolean>
  >({});

  const isMobileOverlayEnabled = useMemo(() => {
    return (p: Project) => !!p.mobile && !failedMobileByTitle[p.title];
  }, [failedMobileByTitle]);

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
        px: { xs: 2, sm: 3, md: 5, lg: 8 },
        py: { xs: 8, md: 10, lg: 12 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1600, mx: "auto" }}>
        <Typography
          id="portfolio-heading"
          component="h1"
          align="center"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.4rem", sm: "3rem", md: "3.75rem" },
            letterSpacing: "-0.02em",
            mb: { xs: 5, md: 8 },
            color: "text.primary",
          }}
        >
          Portfolio
        </Typography>

        <Grid2 container spacing={{ xs: 3, sm: 4, md: 5 }}>
          {projects.map((project) => {
            const titleLower = project.title.toLowerCase();

            const isPersonalPortfolio = titleLower.includes(
              "my personal portfolio",
            );

            const isFullBleed =
              !isPersonalPortfolio &&
              (titleLower.includes("energy star") ||
                titleLower.includes("rose salon") ||
                project.link.includes("energystar.gov") ||
                project.link.includes("rose-salon.netlify.app"));

            const techListId = `tech-${project.title.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <Grid2 key={project.title} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    transition: "all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: "0 24px 48px rgba(0,0,0,0.16)",
                      borderColor: "secondary.main",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 220, sm: 260, md: 300 },
                    }}
                  >
                    <Box
                      component="img"
                      src={project.desktop}
                      srcSet={
                        project.desktop2x
                          ? `${project.desktop} 1x, ${project.desktop2x} 2x`
                          : undefined
                      }
                      sizes="(min-width: 900px) 33vw, 100vw"
                      alt={`${project.title} desktop screenshot`}
                      loading="lazy"
                      decoding="async"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: isFullBleed ? "cover" : "contain",
                        objectPosition: "center top",
                        bgcolor: "#f8f9fa",
                      }}
                    />

                    {isMobileOverlayEnabled(project) && (
                      <Box
                        component="img"
                        src={project.mobile as string}
                        srcSet={
                          project.mobile2x
                            ? `${project.mobile} 1x, ${project.mobile2x} 2x`
                            : undefined
                        }
                        sizes="120px"
                        alt={`${project.title} mobile screenshot overlay`}
                        loading="lazy"
                        decoding="async"
                        onError={() =>
                          setFailedMobileByTitle((prev) => ({
                            ...prev,
                            [project.title]: true,
                          }))
                        }
                        sx={{
                          position: "absolute",
                          bottom: { xs: 12, md: 16 },
                          right: { xs: 12, md: 16 },
                          width: { xs: 80, sm: 100, md: 120 },
                          height: "auto",
                          aspectRatio: "9 / 19.5",
                          borderRadius: 3,
                          border: "3px solid white",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                          objectFit: "cover",
                          objectPosition: getMobileOverlayObjectPosition(
                            project.title,
                          ),
                          transition: "transform 0.3s ease",
                          "&:hover": { transform: "scale(1.08)" },
                        }}
                      />
                    )}
                  </Box>

                  <CardContent
                    sx={{
                      flex: 1,
                      p: { xs: 3, md: 3.5 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 800,
                        lineHeight: 1.2,
                        fontSize: { xs: "1.35rem", md: "1.5rem" },
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {project.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.65,
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        display: "-webkit-box",
                        WebkitLineClamp: { xs: 3, md: 4 },
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      {project.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: "italic",
                        color: "text.secondary",
                        opacity: 0.85,
                        fontSize: "0.9rem",
                      }}
                    >
                      {project.role}
                    </Typography>

                    <Box>
                      <Typography
                        component="span"
                        id={techListId}
                        sx={{
                          position: "absolute",
                          width: 1,
                          height: 1,
                          padding: 0,
                          margin: -1,
                          overflow: "hidden",
                          clip: "rect(0, 0, 0, 0)",
                          whiteSpace: "nowrap",
                          border: 0,
                        }}
                      >
                        Technologies used in {project.title}:
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                        aria-labelledby={techListId}
                        sx={{ mt: 1, gap: 0.75 }}
                      >
                        {project.tech.slice(0, 10).map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.82rem",
                              borderRadius: "12px",
                              borderColor: "divider",
                              bgcolor: "action.hover",
                              color: "text.primary",
                              "&:hover": {
                                bgcolor: "action.selected",
                                borderColor: "secondary.main",
                              },
                            }}
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
                        mt: 2,
                        py: 1.4,
                        fontWeight: 800,
                        fontSize: "1rem",
                        borderRadius: 2,
                        textTransform: "none",
                        boxShadow: "0 4px 14px rgba(20,184,166,0.25)",
                        "&:hover": {
                          boxShadow: "0 8px 24px rgba(20,184,166,0.35)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.22s ease",
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
