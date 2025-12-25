import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  ButtonBase,
  Stack,
  Grid2,
} from "@mui/material";
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
  Web: <WebIcon fontSize="large" color="primary" />,
  Search: <SearchIcon fontSize="large" color="primary" />,
  BarChart: <BarChartIcon fontSize="large" color="primary" />,
};

const Services = () => {
  const services: Service[] = servicesData as Service[];
  const navbarHeight = NAVBAR_HEIGHT.desktop;

  const goToContact = (title: string) => {
    window.location.href = `/?cta=true&service=${encodeURIComponent(title)}#contact`;
  };

  return (
    <Box
      id="services"
      component="section"
      sx={{
        minHeight: `calc(100dvh - ${navbarHeight}px)`,
        pt: `${navbarHeight}px`,
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 6 },
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ width: "100%", overflowX: "hidden" }}>
        <Stack spacing={{ xs: 4, md: 6 }} alignItems="center" textAlign="center" sx={{ width: "100%" }}>
          {/* I want this to be impossible to miss, but still feel premium (not cheesy). */}
          <Box
            role="note"
            aria-label="New customer special"
            sx={(t) => ({
              width: "100%",
              maxWidth: 960,
              alignSelf: "flex-start",
              textAlign: "left",
              borderRadius: 3,
              px: { xs: 2.25, sm: 3 },
              py: { xs: 2.0, sm: 2.25 },
              border: `1px solid ${t.palette.divider}`,
              boxShadow: "0 14px 34px rgba(2, 6, 23, 0.10)",
              position: "relative",
              overflow: "hidden",
              backgroundImage: `linear-gradient(135deg, ${t.palette.secondary.main}18, rgba(255,255,255,0.92) 60%)`,
              backdropFilter: "saturate(140%) blur(8px)",
              WebkitBackdropFilter: "saturate(140%) blur(8px)",

              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: `radial-gradient(700px 240px at 10% 0%, ${t.palette.secondary.main}26, transparent 60%)`,
                pointerEvents: "none",
              },

              "&::after": {
                content: '""',
                position: "absolute",
                top: -60,
                right: -120,
                width: 320,
                height: 200,
                transform: "rotate(18deg)",
                background: `linear-gradient(90deg, transparent, ${t.palette.secondary.main}22, transparent)`,
                pointerEvents: "none",
              },
            })}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.25, sm: 1.75 }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              sx={{ position: "relative" }}
            >
              <Box
                aria-hidden="true"
                sx={(t) => ({
                  display: "grid",
                  placeItems: "center",
                  width: 54,
                  height: 54,
                  borderRadius: 999,
                  bgcolor: t.palette.secondary.main,
                  color: t.palette.secondary.contrastText,
                  boxShadow: "0 10px 24px rgba(20,184,166,0.28)",
                  flex: "0 0 auto",
                })}
              >
                <LocalOfferIcon sx={{ fontSize: 28 }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 950,
                    fontSize: { xs: "1.15rem", sm: "1.25rem" },
                    lineHeight: 1.2,
                    color: "text.primary",
                  }}
                >
                  New Customer Special
                </Typography>

                <Typography
                  sx={{
                    mt: 0.35,
                    fontWeight: 700,
                    fontSize: { xs: "1.02rem", sm: "1.08rem" },
                    lineHeight: 1.55,
                    color: "text.secondary",
                  }}
                >
                  Get <Box component="span" sx={{ color: "text.primary", fontWeight: 900 }}>20% off your first project</Box>{" "}
                  + a <Box component="span" sx={{ color: "text.primary", fontWeight: 900 }}>free 30-minute consultation</Box>.
                  Mention <Box component="span" sx={{ fontWeight: 900, color: "secondary.main" }}>"New Customer"</Box> in your inquiry.
                </Typography>
              </Box>

              <Box sx={{ flex: "0 0 auto" }}>
                <Typography
                  component="a"
                  href="/?cta=true#contact"
                  sx={(t) => ({
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 900,
                    textDecoration: "none",
                    color: t.palette.secondary.contrastText,
                    bgcolor: t.palette.secondary.main,
                    px: 2.25,
                    py: 1.25,
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                    boxShadow: "0 12px 26px rgba(20,184,166,0.26)",
                    transition: "transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 16px 32px rgba(20,184,166,0.30)",
                      bgcolor: t.palette.secondary.dark,
                    },
                    "&:focus-visible": {
                      outline: `3px solid ${t.palette.primary.main}`,
                      outlineOffset: 3,
                    },
                  })}
                >
                  Claim offer →
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.35rem", md: "3.35rem" },
                lineHeight: 1.1,
              }}
            >
              Services
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 820,
                mx: "auto",
                color: "text.secondary",
                fontSize: { xs: "1.08rem", md: "1.2rem" },
                lineHeight: 1.7,
              }}
            >
              Accessible websites + powerful Excel analytics. Build online and make smarter decisions.
            </Typography>
          </Box>

          <Grid2 container spacing={{ xs: 3, md: 5 }} justifyContent="center" sx={{ width: "100%", m: 0 }}>
            {services.map((service) => (
              <Grid2 key={service.title} size={{ xs: 12, sm: 8, md: 4 }} sx={{ minWidth: 0 }}>
                <ButtonBase
                  onClick={() => goToContact(service.title)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 3,
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": { transform: "translateY(-6px)" },
                    "&:focus-visible": {
                      outline: "3px solid",
                      outlineColor: "secondary.main",
                      outlineOffset: 4,
                    },
                  }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      p: { xs: 3, md: 4 },
                      textAlign: "center",
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 3,
                      boxShadow: 4,
                      overflow: "hidden",
                      "&:hover": { boxShadow: 12 },
                    }}
                  >
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                      <Box sx={{ mb: 3 }}>{iconMap[service.icon]}</Box>

                      <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
                        {service.title}
                      </Typography>

                      <Typography color="text.secondary" sx={{ flex: 1, mb: 3 }}>
                        {service.description}
                      </Typography>

                      <Typography variant="h6" color="primary" sx={{ fontWeight: 800, mb: 2 }}>
                        {service.price}
                      </Typography>

                      <Typography sx={{ color: "secondary.main", fontWeight: 900, textDecoration: "underline" }}>
                        Get quote →
                      </Typography>
                    </CardContent>
                  </Card>
                </ButtonBase>
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </Container>
    </Box>
  );
};

export default Services;
