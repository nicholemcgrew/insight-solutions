// src/sections/Services.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  ButtonBase,
} from "@mui/material";
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

const iconMap = {
  Web: <WebIcon fontSize="large" color="primary" />,
  Accessibility: <AccessibilityIcon fontSize="large" color="primary" />,
  Search: <SearchIcon fontSize="large" color="primary" />,
  DesignServices: <DesignServicesIcon fontSize="large" color="primary" />,
  BarChart: <BarChartIcon fontSize="large" color="primary" />,
  Collections: <CollectionsIcon fontSize="large" color="primary" />,
};

const Services = () => {
  const services: Service[] = servicesData as Service[];

  return (
    <Box
      component="section"
      id="services"
      aria-labelledby="services-heading"
      tabIndex={-1}
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "background.default", scrollMarginTop: { xs: 70, md: 90 },
      }}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <Container maxWidth="lg">
        <Typography
          id="services-heading"
          variant="h2"
          align="center"
          gutterBottom
          color="text.primary"
          sx={{ fontWeight: 700, mb: 3 }}
          itemProp="name"
        >
          My Services
        </Typography>

        <Typography
          variant="body1"
          align="center"
          maxWidth="800px"
          mx="auto"
          paragraph
          color="text.secondary"
          itemProp="description"
        >
          From responsive web development to portfolio launches — I deliver
          results that grow your business.
        </Typography>

        <Box
          component="ul"
          role="list"
          aria-label="Available services"
          sx={{ listStyle: "none", p: 0, m: 0 }}
        >
          <Grid2 container spacing={{ xs: 3, md: 4 }} component="li">
            {services.map((service, index) => (
              <Grid2
                size={{ xs: 12, sm: 6, md: 4 }}
                key={index}
                component="li"
                role="listitem"
              >
                <ButtonBase
                  onClick={() => {
                    // window.location.href = `/?cta=true&service=${encodeURIComponent(service.title)}#contact`;
                  }}
                  sx={{
                    display: "block",
                    textAlign: "center",
                    height: "100%",
                    width: "100%",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 8,
                    },
                    "&:focus-visible": {
                      outline: "3px solid",
                      outlineColor: "secondary.main",
                      outlineOffset: "2px",
                    },
                  }}
                  aria-label={`Select ${service.title} service and go to contact form`}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      minHeight: { xs: 220, md: 240 },
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 3,
                      boxShadow: 1,
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "inherit",
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{iconMap[service.icon]}</Box>

                    <CardContent
                      sx={{ flexGrow: 1, p: 0, textAlign: "center" }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        color="text.primary"
                        fontWeight={700}
                        sx={{ mb: 1 }}
                        itemProp="name"
                      >
                        {service.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                        itemProp="description"
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </ButtonBase>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
