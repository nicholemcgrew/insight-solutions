import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
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

  // If a mobile overlay image fails to load, hide ONLY that overlay (prevents white box).
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
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        py: { xs: 6, md: 7 },
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
            mb: { xs: 3.5, md: 5 },
          }}
        >
          Portfolio
        </Typography>

        <Grid2 container spacing={{ xs: 3, md: 3.25 }}>
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

            const CARD_HEIGHT = { xs: 510, sm: 540, md: 620 };
            const IMAGE_HEIGHT = { xs: 250, sm: 280, md: 320 };

            const MOBILE_OVERLAY_WIDTH = { xs: 86, sm: 104, md: 128 };
            const MOBILE_OVERLAY_INSET = { xs: 10, sm: 12, md: 14 };

            const mobileOverlayObjectPosition = getMobileOverlayObjectPosition(
              project.title,
            );
            const desktopObjectPosition = getDesktopObjectPosition(
              project.title,
            );

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
                    {/* Desktop image */}
                    <Box
                      component="img"
                      src={project.desktop}
                      srcSet={
                        project.desktop2x
                          ? `${project.desktop} 1x, ${project.desktop2x} 2x`
                          : undefined
                      }
                      sizes="(min-width: 900px) 33vw, 100vw"
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%" }}
                      sx={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        bgcolor: "#f5f5f5",
                        objectFit: isFullBleed ? "cover" : "contain",
                        objectPosition: desktopObjectPosition,
                      }}
                    />

                    {/* Mobile overlay (same behavior as before; hides if the image fails) */}
                    {isMobileOverlayEnabled(project) && (
                      <Box
                        component="img"
                        src={project.mobile as string}
                        srcSet={
                          project.mobile2x
                            ? `${project.mobile} 1x, ${project.mobile2x} 2x`
                            : undefined
                        }
                        sizes="128px"
                        alt={`${project.title} mobile screenshot`}
                        loading="lazy"
                        decoding="async"
                        onError={() =>
                          setFailedMobileByTitle((p) => ({
                            ...p,
                            [project.title]: true,
                          }))
                        }
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          display: "block",
                          bottom: MOBILE_OVERLAY_INSET,
                          right: MOBILE_OVERLAY_INSET,

                          width: MOBILE_OVERLAY_WIDTH,
                          maxWidth: "none",
                          aspectRatio: "9 / 19.5",
                          height: "auto",

                          borderRadius: 2,
                          border: {
                            xs: "2px solid white",
                            md: "3px solid white",
                          },
                          boxShadow: 6,
                          bgcolor: "white",

                          objectFit: "cover",
                          objectPosition: mobileOverlayObjectPosition,

                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                        }}
                      />
                    )}
                  </Box>

                  {/* CONTENT */}
                  <CardContent
                    sx={{
                      flex: 1,
                      px: 2.75,
                      py: 2.25,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
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
                        WebkitLineClamp: { xs: 4, md: 4 },
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

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                      aria-label={`${project.title} technologies`}
                      sx={{ mt: 0.5, rowGap: 1 }}
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
                        py: 1.2,
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
