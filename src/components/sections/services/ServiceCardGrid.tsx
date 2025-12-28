import React from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import ServiceCard from "./ServiceCard";
import { Service } from "../../../types/services";

interface ServiceCardGridProps {
  services: Service[];
  reducedMotion: boolean;
  getHref: (serviceTitle: string) => string;
  iconMap: Record<Service["icon"], React.ReactNode>;
}

export default function ServiceCardGrid({ services, reducedMotion, getHref, iconMap }: ServiceCardGridProps) {
  // Keep the semantic list + grid rules in one place so card sizing stays consistent.
  return (
    <Box component="ul" aria-label="Service options" sx={{ listStyle: "none", p: 0, m: 0, width: "100%" }}>
      <Grid2 container spacing={{ xs: 3, md: 3.25 }} justifyContent="center" alignItems="stretch">
        {services.map((service) => (
          <Grid2
            component="li"
            key={service.title}
            size={{ xs: 12, sm: 8, md: 4 }}
            sx={{ display: "flex" }}
          >
            <ServiceCard
              service={service}
              href={getHref(service.title)}
              icon={iconMap[service.icon]}
              reducedMotion={reducedMotion}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export {};
