// src/pages/PricingPage.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

import WebIcon from "@mui/icons-material/Web";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SearchIcon from "@mui/icons-material/Search";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BarChartIcon from "@mui/icons-material/BarChart";
import CollectionsIcon from "@mui/icons-material/Collections";
import SupportIcon from "@mui/icons-material/Support";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import pricingData from "../data/pricing.json";

interface Service {
  title: string;
  description: string;
  price: string;
  cta: string;
  icon: string;
}

const iconMap = {
  Web: WebIcon,
  Accessibility: AccessibilityIcon,
  Search: SearchIcon,
  DesignServices: DesignServicesIcon,
  BarChart: BarChartIcon,
  Collections: CollectionsIcon,
  Support: SupportIcon,
} as const;

type IconKey = keyof typeof iconMap;

const PricingPage = () => {
  const services: Service[] = pricingData as Service[];

  return (
    <Box
      component="main"
      id="pricing"
      aria-labelledby="pricing-heading"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* SEO/508: real page heading */}
        <Typography
          id="pricing-heading"
          component="h1"
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 900,
            letterSpacing: 0.2,
            fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.25rem" },
            lineHeight: 1.12,
            mb: 2,
          }}
        >
          Transparent Pricing
        </Typography>

        <Typography
          variant="h6"
          component="p"
          align="center"
          maxWidth="52rem"
          mx="auto"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            lineHeight: 1.6,
            mb: { xs: 4, md: 6 },
          }}
        >
          Clear, fair pricing for every service. No surprises — just results.
        </Typography>

        <Grid2 container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as IconKey] ?? WebIcon;

            return (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={`${service.title}-${index}`}>
                <Card
                  component="section"
                  aria-label={`${service.title} pricing card`}
                  sx={(t) => ({
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: `1px solid ${t.palette.divider}`,
                    boxShadow: 4,
                    overflow: "hidden",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                      boxShadow: 10,
                      transform: "translateY(-6px)",
                    },
                    "&:focus-within": {
                      outline: `3px solid ${t.palette.primary.main}`,
                      outlineOffset: 3,
                    },
                  })}
                >
                  <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 3.5 } }}>
                    {/* Icon */}
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      <Box
                        sx={(t) => ({
                          width: 64,
                          height: 64,
                          borderRadius: 999,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: t.palette.action.hover,
                        })}
                        aria-hidden="true"
                      >
                        <IconComponent sx={{ fontSize: 36, color: "primary.main" }} />
                      </Box>
                    </Box>

                    {/* Title */}
                    <Typography
                      component="h2"
                      variant="h5"
                      align="center"
                      sx={{
                        fontWeight: 900,
                        letterSpacing: 0.2,
                        fontSize: { xs: "1.35rem", sm: "1.45rem" },
                        lineHeight: 1.2,
                        mb: 1,
                      }}
                    >
                      {service.title}
                    </Typography>

                    {/* Price */}
                    <Typography
                      variant="h3"
                      align="center"
                      sx={{
                        color: "primary.main",
                        fontWeight: 900,
                        fontSize: { xs: "2rem", sm: "2.25rem" },
                        lineHeight: 1.1,
                        my: 2,
                      }}
                    >
                      {service.price}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Description */}
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "1.05rem", sm: "1.1rem" },
                        lineHeight: 1.7,
                        mb: 2.5,
                      }}
                    >
                      {service.description}
                    </Typography>

                    {/* CTA text (from JSON) as a benefit line */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="flex-start"
                      sx={{ maxWidth: 420, mx: "auto" }}
                    >
                      <CheckCircleIcon color="secondary" sx={{ mt: "2px" }} aria-hidden="true" />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          fontWeight: 700,
                          fontSize: { xs: "0.98rem", sm: "1.02rem" },
                          lineHeight: 1.5,
                        }}
                      >
                        {service.cta}
                      </Typography>
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ p: { xs: 3, md: 3.5 }, pt: 0 }}>
                    {/* SEO/508: Use a real link to the contact section for conversions */}
                    <Button
                      component="a"
                      href={`/?service=${encodeURIComponent(service.title)}#contact`}
                      variant="contained"
                      color="secondary"
                      fullWidth
                      size="large"
                      aria-label={`Get a quote for ${service.title}`}
                      sx={{
                        py: 1.75,
                        fontWeight: 800,
                        fontSize: { xs: "1.05rem", sm: "1.1rem" },
                        textTransform: "none",
                        borderRadius: 2,
                        "&:focus-visible": {
                          outline: "3px solid",
                          outlineColor: "primary.main",
                          outlineOffset: 3,
                        },
                      }}
                    >
                      Get Quote
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>

        {/* 508/SEO-friendly supporting copy */}
        <Typography
          variant="body2"
          component="p"
          align="center"
          sx={{
            mt: { xs: 5, md: 6 },
            color: "text.secondary",
            fontSize: { xs: "0.98rem", sm: "1rem" },
            lineHeight: 1.6,
            maxWidth: "60rem",
            mx: "auto",
          }}
        >
          Need something custom? I can tailor a package for accessibility, SEO, performance, and content updates. Use the
          “Get Quote” button to prefill your service selection.
        </Typography>
      </Container>
    </Box>
  );
};

export default PricingPage;
