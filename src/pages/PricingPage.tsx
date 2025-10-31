// src/pages/PricingPage.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import WebIcon from "@mui/icons-material/Web";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SearchIcon from "@mui/icons-material/Search";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BarChartIcon from "@mui/icons-material/BarChart";
import CollectionsIcon from "@mui/icons-material/Collections";
import SupportIcon from "@mui/icons-material/Support";

import pricingData from "../data/pricing.json";

interface Service {
  title: string;
  description: string;
  price: string;
  cta: string;
  icon: string;
}

const iconMap = {
  Web: <WebIcon fontSize="large" color="primary" />,
  Accessibility: <AccessibilityIcon fontSize="large" color="primary" />,
  Search: <SearchIcon fontSize="large" color="primary" />,
  DesignServices: <DesignServicesIcon fontSize="large" color="primary" />,
  BarChart: <BarChartIcon fontSize="large" color="primary" />,
  Collections: <CollectionsIcon fontSize="large" color="primary" />,
  Support: <SupportIcon fontSize="large" color="primary" />,
} as const;

type IconKey = keyof typeof iconMap;

const PricingPage = () => {
  const services: Service[] = pricingData as Service[];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }} id="pricing">
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom color="text.primary" sx={{ fontWeight: 700, mb: 3 }}>
          Transparent Pricing
        </Typography>
        <Typography variant="body1" align="center" maxWidth="700px" mx="auto" paragraph color="text.secondary">
          Clear, fair pricing for every service. No surprises — just results.
        </Typography>

        <Grid2 container spacing={4} justifyContent="center" mt={2}>
          {services.map((service, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 3,
                  bgcolor: "background.paper", // ← WHITE-ON-WHITE FIXED
                  transition: "0.3s",
                  "&:hover": { boxShadow: 8, transform: "translateY(-8px)" },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    {iconMap[service.icon as IconKey]}
                  </Box>

                  <Typography variant="h5" gutterBottom color="text.primary" fontWeight={700} align="center">
                    {service.title}
                  </Typography>

                  <Typography variant="h4" color="primary.main" fontWeight={800} align="center" sx={{ my: 2 }}>
                    {service.price}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" align="center" paragraph>
                    {service.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={() => {
                      const contact = document.getElementById("contact");
                      if (contact) {
                        sessionStorage.setItem("selectedService", service.title);
                        contact.scrollIntoView({ behavior: "smooth" });
                      } else {
                        sessionStorage.setItem("selectedService", service.title);
                        window.location.href = "/#contact";
                      }
                    }}
                    sx={{ py: 1.5, fontWeight: 600, textTransform: "none" }}
                  >
                    {service.cta}
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default PricingPage;