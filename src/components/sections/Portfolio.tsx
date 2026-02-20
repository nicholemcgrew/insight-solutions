import { Box, Typography, Button } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useMemo, useState } from "react";

import portfolioData from "../../data/portfolioData.json";
import { useNavbarOffset } from "../../hooks/useNavbarOffset";

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

const Portfolio = () => {
  const projects = portfolioData as Project[];
  const { navbarHeight } = useNavbarOffset();

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
        // Removed forced height — let content determine size
        minHeight: `calc(100dvh - ${navbarHeight}px)`, // keep min for feel, but not strict
        scrollMarginTop: `${navbarHeight}px`, // keeps nav jump perfect
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background:
          "linear-gradient(160deg, #dde6ff 0%, #f0f4ff 40%, #fce7f3 100%)",
        px: { xs: 2, sm: 3, md: 5, lg: 8 },
        py: { xs: 6, md: 8, lg: 10 }, // increased padding slightly for breathing room
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1600, mx: "auto" }}>
        <Typography
          id="portfolio-heading"
          component="h2"
          align="center"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
            letterSpacing: "-0.03em",
            mb: { xs: 4, md: 6 },
            color: "text.primary",
          }}
        >
          Recent Projects
        </Typography>

        <Grid2 container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {projects.map((project) => {
            const cardLabelId = `project-title-${project.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`;

            return (
              <Grid2 key={project.title} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Box
                  component="article"
                  aria-labelledby={cardLabelId}
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    bgcolor: "white",
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
                    border: "2px solid rgba(99,102,241,0.25)",
                    transition:
                      "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      borderColor: "rgba(99,102,241,0.55)",
                    },
                  }}
                >
                  {/* Full-bleed image */}
                  <Box
                    component="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    tabIndex={-1}
                    sx={{
                      display: "block",
                      position: "relative",
                      height: { xs: 240, sm: 270, md: 300 },
                      bgcolor: "#f0f2f5",
                      outline: "none",
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
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
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
                        sizes="140px"
                        alt={`${project.title} mobile screenshot`}
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
                          width: { xs: 90, sm: 110, md: 140 },
                          height: "auto",
                          aspectRatio: "9 / 19.5",
                          borderRadius: "16px",
                          border: "4px solid white",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                          objectFit: "cover",
                          objectPosition: getMobileOverlayObjectPosition(
                            project.title,
                          ),
                        }}
                      />
                    )}
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: { xs: 3, md: 4 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                        gap: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          id={cardLabelId}
                          variant="h5"
                          component="h3"
                          sx={{
                            fontWeight: 800,
                            fontSize: { xs: "1.2rem", md: "1.35rem" },
                            color: "#111827",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.3,
                          }}
                        >
                          {project.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          component="p"
                          sx={{
                            mt: 0.3,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: "#6366f1",
                          }}
                        >
                          {project.role}
                        </Typography>
                      </Box>

                      <Button
                        component="a"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live site`}
                        sx={{
                          minWidth: 44,
                          height: 44,
                          borderRadius: "50%",
                          flexShrink: 0,
                          bgcolor: "rgba(99,102,241,0.08)",
                          color: "#6366f1",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: "rgba(99,102,241,0.16)",
                          },
                        }}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </Button>
                    </Box>

                    <Typography
                      variant="body2"
                      component="p"
                      sx={{
                        fontSize: { xs: "0.9rem", md: "0.95rem" },
                        color: "#374151",
                        lineHeight: 1.65,
                      }}
                    >
                      {project.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Portfolio;
