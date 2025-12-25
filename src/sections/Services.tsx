// src/sections/Services.tsx
import React, { useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  ButtonBase,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {
  Web as WebIcon,
  Search as SearchIcon,
  BarChart as BarChartIcon,
  LocalOffer as LocalOfferIcon,
} from "@mui/icons-material";
import { NAVBAR_HEIGHT } from "../components/Navbar";
import servicesData from "../data/services.json";

interface Service {
  title: string;
  description: string;
  price: string;
  icon: "Web" | "Search" | "BarChart";
}

const iconMap: Record<Service["icon"], React.ReactNode> = {
  Web: <WebIcon fontSize="large" color="primary" aria-hidden focusable="false" />,
  Search: <SearchIcon fontSize="large" color="primary" aria-hidden focusable="false" />,
  BarChart: <BarChartIcon fontSize="large" color="primary" aria-hidden focusable="false" />,
};

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const Services = () => {
  const services: Service[] = servicesData as Service[];

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navbarHeight = isDesktop ? NAVBAR_HEIGHT.desktop : NAVBAR_HEIGHT.mobile;

  // Disable hover transitions for users who prefer reduced motion.
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  const buildContactHref = (serviceTitle?: string) => {
    const params = new URLSearchParams({ cta: "true" });
    if (serviceTitle) params.set("service", serviceTitle);
    return `/?${params.toString()}#contact`;
  };

  return (
    <Box
      id="services"
      component="section"
      aria-labelledby="services-title"
      sx={{
        scrollMarginTop: `${navbarHeight + 16}px`,
        pt: `${navbarHeight}px`,
        minHeight: `calc(100dvh - ${navbarHeight}px)`,
        py: { xs: 5, md: 3.5 },
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        bgcolor: "background.default",
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={{ xs: 4, md: 2.25 }}
          alignItems="center"
          textAlign="center"
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: { md: "space-between" },
          }}
        >
          <Box
            component="aside"
            aria-label="New customer special"
            sx={(t) => ({
              width: "100%",
              maxWidth: 980,
              textAlign: "left",
              borderRadius: 3,
              px: { xs: 2.5, md: 3 },
              py: { xs: 2.25, md: 2 },
              border: `1px solid ${t.palette.divider}`,
              boxShadow: "0 12px 28px rgba(2, 6, 23, 0.08)",
            })}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <Box
                aria-hidden
                sx={(t) => ({
                  display: "grid",
                  placeItems: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 999,
                  bgcolor: t.palette.secondary.main,
                  color: t.palette.secondary.contrastText,
                })}
              >
                <LocalOfferIcon aria-hidden />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography component="p" fontWeight={950} sx={{ m: 0 }}>
                  New Customer Special
                </Typography>
                <Typography component="p" color="text.secondary" sx={{ m: 0 }}>
                  Get <strong>20% off your first project</strong> plus a{" "}
                  <strong>free 30-minute consultation</strong>.
                </Typography>
              </Box>

              <Typography
                component="a"
                href={buildContactHref()}
                sx={(t) => ({
                  fontWeight: 900,
                  textDecoration: "none",
                  color: t.palette.secondary.contrastText,
                  bgcolor: t.palette.secondary.main,
                  px: 3,
                  py: 1.25,
                  borderRadius: 999,
                  "&:focus-visible": {
                    outline: `3px solid ${t.palette.primary.main}`,
                    outlineOffset: 3,
                  },
                })}
              >
                Claim offer →
              </Typography>
            </Stack>
          </Box>

          <Box>
            {/* Use h2 to avoid multiple h1s if the hero already owns the page h1 */}
            <Typography id="services-title" component="h2" variant="h2" sx={{ fontWeight: 950 }}>
              Services
            </Typography>

            <Typography
              component="p"
              sx={{
                mt: 1.25,
                maxWidth: 900,
                mx: "auto",
                color: "text.secondary",
                fontSize: { xs: "1.05rem", md: "1.1rem" },
              }}
            >
              Design and data working together to drive clarity, confidence, and growth.
            </Typography>
          </Box>

          <Box
            component="ul"
            aria-label="Service options"
            sx={{ listStyle: "none", p: 0, m: 0, width: "100%" }}
          >
            <Grid2
              container
              spacing={{ xs: 3, md: 3.25 }}
              justifyContent="center"
              alignItems="stretch"
            >
              {services.map((service) => (
                <Grid2
                  component="li"
                  key={service.title}
                  size={{ xs: 12, sm: 8, md: 4 }}
                  sx={{ display: "flex" }}
                >
                  <ButtonBase
                    component="a"
                    href={buildContactHref(service.title)}
                    aria-label={`Get a quote for ${service.title}`}
                    sx={(t) => ({
                      width: "100%",
                      display: "flex",
                      alignItems: "stretch",
                      borderRadius: 3,
                      transition: reducedMotion ? "none" : "transform 180ms ease",
                      "&:hover": {
                        transform: reducedMotion ? "none" : "translateY(-4px)",
                      },
                      "&:focus-visible": {
                        outline: `3px solid ${t.palette.secondary.main}`,
                        outlineOffset: 4,
                      },
                    })}
                  >
                    <Card
                      component="article"
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        boxShadow: 4,
                      }}
                    >
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          p: 3,
                        }}
                      >
                        <Box mb={2}>{iconMap[service.icon]}</Box>

                        <Typography component="h3" fontWeight={950} mb={1.5}>
                          {service.title}
                        </Typography>

                        <Typography component="p" color="text.secondary" mb={2}>
                          {service.description}
                        </Typography>

                        <Box sx={{ mt: "auto" }}>
                          <Typography component="p" fontWeight={900} color="primary" mb={1}>
                            {service.price}
                          </Typography>

                          <Typography
                            component="p"
                            sx={{
                              fontWeight: 900,
                              color: "secondary.main",
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                              m: 0,
                            }}
                          >
                            Get quote →
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </ButtonBase>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Services;
