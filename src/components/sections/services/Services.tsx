// src/components/sections/services/Services.tsx
import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Web as WebIcon, Search as SearchIcon, BarChart as BarChartIcon } from "@mui/icons-material";

import servicesData from "../../../data/servicesData.json";
import { Service } from "../../../types/services";
import { useNavbarOffset } from "../../../hooks/useNavbarOffset";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { buildContactHref } from "../../../utils/buildContactHref";

import SectionHeader from "../SectionHeader";
import ServiceCardGrid from "./ServiceCardGrid";

const iconMap: Record<Service["icon"], React.ReactNode> = {
  Web: <WebIcon fontSize="large" color="primary" aria-hidden focusable="false" />,
  Search: <SearchIcon fontSize="large" color="primary" aria-hidden focusable="false" />,
  BarChart: <BarChartIcon fontSize="large" color="primary" aria-hidden focusable="false" />,
};

const Services = () => {
  const services: Service[] = servicesData as Service[];

  const { navbarHeight, scrollMarginTop } = useNavbarOffset();
  const reducedMotion = usePrefersReducedMotion();

  // Keep CTA URL rules consistent across cards.
  const getHref = (title: string) => buildContactHref(title);

  return (
    <Box
      id="services"
      component="section"
      aria-labelledby="services-title"
      sx={{
        scrollMarginTop: `${scrollMarginTop}px`,
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
          sx={{ width: "100%", height: "100%", justifyContent: { md: "space-between" } }}
        >
          <SectionHeader
            id="services-title"
            as="h2"
            title="Services"
            subtitle="Design and data working together to drive clarity, confidence, and growth."
          />

          <ServiceCardGrid services={services} reducedMotion={reducedMotion} getHref={getHref} iconMap={iconMap} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Services;
