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
import AnalyticsIcon from "@mui/icons-material/BarChart";
import CollectionsIcon from "@mui/icons-material/Collections";

// Import JSON
import servicesData from "../data/services.json";

// Type for JSON
interface Service {
  title: string;
  description: string;
  icon: "Web" | "Accessibility" | "Search" | "DesignServices" | "Analytics" | "Collections";
}

interface ServicesProps {
  setSelectedService: (service: string) => void;
}

const iconMap = {
  Web: <WebIcon fontSize="large" color="primary" />,
  Accessibility: <AccessibilityIcon fontSize="large" color="primary" />,
  Search: <SearchIcon fontSize="large" color="primary" />,
  DesignServices: <DesignServicesIcon fontSize="large" color="primary" />,
  Analytics: <AnalyticsIcon fontSize="large" color="primary" />,
  Collections: <CollectionsIcon fontSize="large" color="primary" />,
};

const Services = ({ setSelectedService }: ServicesProps) => {
  const services: Service[] = servicesData as Service[];

  return (
    <Box sx={{ py: 4, bgcolor: "background.default" }} id="services">
      <Container>
        <Typography variant="h2" align="center" gutterBottom color="text.primary">
          My Services
        </Typography>
        <Typography
          variant="body1"
          align="center"
          maxWidth="700px"
          mx="auto"
          gutterBottom
          color="text.secondary"
        >
          From responsive web development to portfolio launches — I deliver results that grow your business.
        </Typography>

        <Grid2 container spacing={3} mt={2}>
          {services.map((service, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <ButtonBase
                onClick={() => {
                  setSelectedService(service.title);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                sx={{
                  display: "block",
                  textAlign: "center",
                  height: "100%",
                  borderRadius: 1,
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                    bgcolor: "grey.50",
                  },
                }}
                role="button"
                aria-label={`Learn more about ${service.title}`}
              >
                <Card
                
                    sx={{
    height: '100%',
    bgcolor: 'background.paper',     // ← MUI paper (white in light, dark in dark)
    border: '1px solid',
    borderColor: 'divider',          // ← Subtle border
    borderRadius: 2,
    boxShadow: 1,
    transition: '0.3s',
    '&:hover': {
      boxShadow: 6,
      transform: 'translateY(-4px)',
    },
  }}
                >
                  <Box sx={{ mb: 2, mt: 1 }}>{iconMap[service.icon]}</Box>
                  <CardContent sx={{ flexGrow: 1, p: 0 }}>
                    <Typography variant="h6" gutterBottom color="text.primary" fontWeight={600}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
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