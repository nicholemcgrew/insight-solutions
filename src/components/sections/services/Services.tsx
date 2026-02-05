import React from "react";
import { Box, Container, Stack } from "@mui/material";
import {
  Web as WebIcon,
  Accessibility as AccessibilityIcon,
  Search as SearchIcon,
  DesignServices as DesignServicesIcon,
  BarChart as BarChartIcon,
  ShowChart as ShowChartIcon,
  Insights as InsightsIcon,
  QueryStats as QueryStatsIcon,
  StackedLineChart as StackedLineChartIcon,
  Leaderboard as LeaderboardIcon,
  Analytics as AnalyticsIcon,
  Collections as CollectionsIcon,
  Support as SupportIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";
import servicesData from "../../../data/servicesData.json";
import { Service } from "../../../types/services";
import { useNavbarOffset } from "../../../hooks/useNavbarOffset";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { buildContactHref } from "../../../utils/buildContactHref";

import SectionHeader from "../SectionHeader";
import ServiceCardGrid from "./ServiceCardGrid";

const iconMap: Record<Service["icon"], React.ReactNode> = {
  Web: (
    <WebIcon fontSize="large" color="primary" aria-hidden focusable="false" />
  ),
  Accessibility: (
    <AccessibilityIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  Search: (
    <SearchIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  DesignServices: (
    <DesignServicesIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),

  // Chart / analytics options (use any of these strings in servicesData.json)
  BarChart: (
    <BarChartIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  ShowChart: (
    <ShowChartIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  Insights: (
    <InsightsIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  QueryStats: (
    <QueryStatsIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  StackedLineChart: (
    <StackedLineChartIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  Leaderboard: (
    <LeaderboardIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  Analytics: (
    <AnalyticsIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),

  Collections: (
    <CollectionsIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  Support: (
    <SupportIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
  Storage: (
    <StorageIcon
      fontSize="large"
      color="primary"
      aria-hidden
      focusable="false"
    />
  ),
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
          spacing={{ xs: 5, md: 4 }}
          alignItems="center"
          textAlign="center"
          sx={{ width: "100%" }}
        >
          <SectionHeader
            id="services-title"
            as="h2"
            title="Services"
            subtitle="Intelligently designed. Driven by data."
          />
<Box sx={{ mt: { xs: 2, md: 3 } }}>
          <ServiceCardGrid
            services={services}
            reducedMotion={reducedMotion}
            getHref={getHref}
            iconMap={iconMap}
          />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Services;
