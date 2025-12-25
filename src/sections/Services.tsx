// src/sections/Services.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  ButtonBase,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import WebIcon from "@mui/icons-material/Web";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SearchIcon from "@mui/icons-material/Search";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BarChartIcon from "@mui/icons-material/BarChart";
import CollectionsIcon from "@mui/icons-material/Collections";

import servicesData from "../data/services.json";

interface Service {
  title: string;
  description: string;
  icon:
    | "Web"
    | "Accessibility"
    | "Search"
    | "DesignServices"
    | "BarChart"
    | "Collections";
}

const HEADER_OFFSET_PX = 96;

const iconMap: Record<Service["icon"], React.ReactNode> = {
  Web: <WebIcon fontSize="large" color="primary" />,
  Accessibility: <AccessibilityIcon fontSize="large" color="primary" />,
  Search: <SearchIcon fontSize="large" color="primary" />,
  DesignServices: <DesignServicesIcon fontSize="large" color="primary" />,
  BarChart: <BarChartIcon fontSize="large" color="primary" />,
  Collections: <CollectionsIcon fontSize="large" color="primary" />,
};

const clampLines = (lines: number) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
});

const Services = () => {
  const services: Service[] = servicesData as Service[];

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  // How many cards per "page" (so the section fits one viewport)
  const perPage = useMemo(() => {
    if (isSmDown) return 1;
    if (isMdDown) return 2;
    return 3;
  }, [isSmDown, isMdDown]);

  const pageCount = Math.max(1, Math.ceil(services.length / perPage));

  const [page, setPage] = useState(0);

  // Ensure page stays valid if perPage changes
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const goToContactWithService = (serviceTitle: string) => {
    window.location.href = `/?cta=true&service=${encodeURIComponent(
      serviceTitle
    )}#contact`;
  };

  const sectionMinHeight = useMemo(
    () => `calc(100dvh - ${HEADER_OFFSET_PX}px)`,
    []
  );

  const startIndex = page * perPage;
  const visible = services.slice(startIndex, startIndex + perPage);

  const canPrev = page > 0;
  const canNext = page < pageCount - 1;

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  // Keyboard support for the carousel container
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <Box
      component="section"
      id="services"
      aria-labelledby="services-heading"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      sx={{
        bgcolor: "background.default",
        scrollMarginTop: `${HEADER_OFFSET_PX}px`,

        // One-screen rule
        minHeight: sectionMinHeight,
        display: "flex",
        alignItems: "center",

        // tighter padding so it fits on laptops
        py: { xs: 3, sm: 4, md: 5 },
        outline: "none",
      }}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Full-width feel (no "why is there a gap") */}
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ width: "100%", px: { xs: 2, sm: 3, md: 6, lg: 10 } }}
      >
        <Stack spacing={{ xs: 1.5, md: 2 }} alignItems="center" textAlign="center">
          <Typography
            id="services-heading"
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 900,
              letterSpacing: 0.2,
              fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.7rem" },
              lineHeight: 1.1,
            }}
            itemProp="name"
          >
            Services
          </Typography>

          <Typography
            component="p"
            sx={{
              color: "text.secondary",
              maxWidth: 980,
              fontSize: { xs: "1.05rem", sm: "1.1rem" },
              lineHeight: 1.7,
              mb: { xs: 0.5, md: 0.5 },
            }}
            itemProp="description"
          >
            Modern, mobile-first builds—plus accessibility (WCAG/508), SEO, and UX upgrades that make your site easier
            to use and easier to find.
          </Typography>

          {/* Carousel controls (508/keyboard + aria-live) */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: { xs: 0.5, md: 0.5 },
            }}
          >
            <IconButton
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous services"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                "&:focus-visible": {
                  outline: "3px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 3,
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <Typography
              component="p"
              aria-live="polite"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 700,
              }}
            >
              Page {page + 1} of {pageCount}
            </Typography>

            <IconButton
              onClick={next}
              disabled={!canNext}
              aria-label="Next services"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                "&:focus-visible": {
                  outline: "3px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 3,
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* Visible cards (paged) */}
          <Box
            role="list"
            aria-label="Available services"
            sx={{ width: "100%", mt: { xs: 1.5, md: 2 } }}
          >
            <Grid2
              container
              spacing={{ xs: 2, md: 2.5 }}
              sx={{
                m: 0,
                alignItems: "stretch",
                justifyContent: "center",
              }}
            >
              {visible.map((service, idx) => (
                <Grid2
                  key={`${service.title}-${startIndex + idx}`}
                  size={{ xs: 12, sm: 6, md: 4 }}
                  role="listitem"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Service"
                  sx={{ minWidth: 0 }}
                >
                  <ButtonBase
                    onClick={() => goToContactWithService(service.title)}
                    sx={(t) => ({
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: 3,
                      textAlign: "left",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": { transform: "translateY(-6px)" },
                      "&:focus-visible": {
                        outline: `3px solid ${t.palette.primary.main}`,
                        outlineOffset: 3,
                        borderRadius: 3,
                      },
                    })}
                    aria-label={`Select ${service.title} and go to the contact form`}
                  >
                    <Card
                      elevation={0}
                      sx={(t) => ({
                        height: { xs: "auto", md: "min(46vh, 420px)" }, // keeps section one-screen
                        bgcolor: "background.paper",
                        border: `1px solid ${t.palette.divider}`,
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: 2,
                        transition: "inherit",
                        "&:hover": { boxShadow: 10 },
                      })}
                    >
                      <CardContent sx={{ p: { xs: 2.75, md: 3.25 } }}>
                        <Stack spacing={1.75} alignItems="center" textAlign="center">
                          <Box
                            aria-hidden="true"
                            sx={(t) => ({
                              width: 64,
                              height: 64,
                              borderRadius: 2.5,
                              display: "grid",
                              placeItems: "center",
                              bgcolor: `${t.palette.primary.main}14`,
                            })}
                          >
                            {iconMap[service.icon]}
                          </Box>

                          <Typography
                            component="h3"
                            variant="h5"
                            sx={{
                              fontWeight: 900,
                              fontSize: { xs: "1.28rem", sm: "1.35rem" },
                              lineHeight: 1.2,
                              color: "text.primary",
                              ...clampLines(2),
                            }}
                            itemProp="name"
                          >
                            {service.title}
                          </Typography>

                          <Typography
                            variant="body1"
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "1.02rem", sm: "1.05rem" },
                              lineHeight: 1.7,
                              ...clampLines(isSmDown ? 5 : 4),
                            }}
                            itemProp="description"
                          >
                            {service.description}
                          </Typography>

                          <Typography
                            component="span"
                            sx={{
                              mt: 0.25,
                              fontWeight: 900,
                              fontSize: { xs: "1.02rem", sm: "1.05rem" },
                              color: "secondary.main",
                              textDecoration: "underline",
                              textUnderlineOffset: 4,
                            }}
                          >
                            Get a quote →
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </ButtonBase>
                </Grid2>
              ))}
            </Grid2>
          </Box>

          {/* Small hint for keyboard users (508-friendly) */}
          <Typography
            component="p"
            sx={{
              mt: { xs: 0.5, md: 0.5 },
              color: "text.secondary",
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            Tip: Use Left/Right arrow keys to browse services.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Services;
