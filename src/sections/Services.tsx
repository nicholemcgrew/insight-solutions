// src/sections/Services.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  ButtonBase,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
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

const iconMap: Record<Service["icon"], React.ReactNode> = {
  Web: <WebIcon fontSize="large" color="primary" />,
  Accessibility: <AccessibilityIcon fontSize="large" color="primary" />,
  Search: <SearchIcon fontSize="large" color="primary" />,
  DesignServices: <DesignServicesIcon fontSize="large" color="primary" />,
  BarChart: <BarChartIcon fontSize="large" color="primary" />,
  Collections: <CollectionsIcon fontSize="large" color="primary" />,
};

const Services = () => {
  const services: Service[] = servicesData as Service[];

  const goToContactWithService = (serviceTitle: string) => {
    // Keeps your current behavior (works from any route)
    window.location.href = `/?cta=true&service=${encodeURIComponent(
      serviceTitle
    )}#contact`;
  };

  return (
    <Box
      component="section"
      id="services"
      aria-labelledby="services-heading"
      tabIndex={-1}
      sx={{
        py: { xs: 9, md: 12 },
        bgcolor: "background.default",
        scrollMarginTop: { xs: 84, md: 104 },
      }}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <Container maxWidth="lg">
        <Typography
          id="services-heading"
          component="h2"
          variant="h2"
          align="center"
          sx={{
            fontWeight: 900,
            letterSpacing: 0.2,
            fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.1rem" },
            lineHeight: 1.12,
            mb: 2.5,
          }}
          itemProp="name"
        >
          Services
        </Typography>

        <Typography
          component="p"
          align="center"
          sx={{
            color: "text.secondary",
            maxWidth: 900,
            mx: "auto",
            fontSize: { xs: "1.1rem", sm: "1.15rem" },
            lineHeight: 1.7,
            mb: { xs: 3, md: 4 },
          }}
          itemProp="description"
        >
          Big, modern, mobile-first builds—plus accessibility, SEO, and UX upgrades that make your site easier to use
          and easier to find.
        </Typography>

        <Grid2
          container
          spacing={{ xs: 3, md: 4 }}
          role="list"
          aria-label="Available services"
          sx={{ m: 0 }}
        >
          {services.map((service, index) => (
            <Grid2
              key={`${service.title}-${index}`}
              size={{ xs: 12, sm: 6, md: 4 }}
              role="listitem"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Service"
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
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
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
                    height: "100%",
                    bgcolor: "background.paper",
                    border: `1px solid ${t.palette.divider}`,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 2,
                    transition: "inherit",
                    "&:hover": { boxShadow: 10 },
                    "&:focus-within": {
                      outline: `3px solid ${t.palette.primary.main}`,
                      outlineOffset: 2,
                    },
                  })}
                >
                  <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                    <Stack spacing={2} alignItems="center" textAlign="center">
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
                          fontSize: { xs: "1.35rem", sm: "1.45rem" },
                          lineHeight: 1.2,
                          color: "text.primary",
                        }}
                        itemProp="name"
                      >
                        {service.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "1.05rem", sm: "1.1rem" },
                          lineHeight: 1.8,
                        }}
                        itemProp="description"
                      >
                        {service.description}
                      </Typography>

                      <Typography
                        component="span"
                        sx={(t) => ({
                          mt: 0.5,
                          fontWeight: 900,
                          fontSize: { xs: "1.02rem", sm: "1.05rem" },
                          color: "secondary.main",
                          textDecoration: "underline",
                          textUnderlineOffset: 4,
                          "&:focus-visible": {
                            outline: `3px solid ${t.palette.primary.main}`,
                            outlineOffset: 3,
                          },
                        })}
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
      </Container>
    </Box>
  );
};

export default Services;
