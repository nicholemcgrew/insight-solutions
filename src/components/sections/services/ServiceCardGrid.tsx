import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";

import { Service } from "../../../types/services";

type Props = {
  services: Service[];
  reducedMotion: boolean;
  getHref: (title: string) => string; // should return "/?service=...#contact"
  iconMap: Record<Service["icon"], React.ReactNode>;
};

const ServiceCardGrid = ({ services, reducedMotion, getHref, iconMap }: Props) => {
  return (
    <Grid2
      container
      spacing={{ xs: 2.5, md: 3 }}
      justifyContent="center"
      sx={{ width: "100%", m: 0 }}
    >
      {services.map((service, index) => {
        const icon = iconMap[service.icon];

        return (
          <Grid2
            key={`${service.title}-${index}`}
            size={{ xs: 12, sm: 6, md: 4 }} // 3 across on desktop
            sx={{ display: "flex" }}
          >
            <Card
              component="section"
              aria-label={`${service.title} service`}
              sx={(t) => ({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                border: `1px solid ${t.palette.divider}`,
                bgcolor: "background.paper",
                boxShadow: 4,
                overflow: "hidden",
                transition: reducedMotion
                  ? "none"
                  : "transform 160ms ease, box-shadow 160ms ease",
                "&:hover": reducedMotion
                  ? undefined
                  : {
                      transform: "translateY(-4px)",
                      boxShadow: 8,
                    },
                "&:focus-within": {
                  outline: `3px solid ${t.palette.secondary.main}`,
                  outlineOffset: 3,
                },
              })}
            >
              <CardContent sx={{ p: { xs: 3, md: 3.25 }, flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    aria-hidden="true"
                    sx={(t) => ({
                      width: 64,
                      height: 64,
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: t.palette.action.hover,
                      border: `1px solid ${t.palette.divider}`,
                      "& svg": { fontSize: 40 },
                    })}
                  >
                    {icon}
                  </Box>
                </Box>

                <Typography
                  component="h3"
                  align="center"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: 0.2,
                    fontSize: { xs: "1.3rem", md: "1.35rem" },
                    lineHeight: 1.2,
                    mb: 1,
                    overflowWrap: "anywhere",
                  }}
                >
                  {service.title}
                </Typography>

                <Typography
                  align="center"
                  sx={{
                    color: "primary.main",
                    fontWeight: 900,
                    fontSize: { xs: "1.9rem", md: "2.05rem" },
                    lineHeight: 1.1,
                    my: 2,
                  }}
                >
                  {service.price}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="body1"
                  align="center"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "1.02rem", md: "1.05rem" },
                    lineHeight: 1.65,
                    overflowWrap: "anywhere",
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: { xs: 3, md: 3.25 }, pt: 0 }}>
                <Button
  component="a"
  href={getHref(service.title)}
  variant="contained"
  color="secondary"
  fullWidth
  size="large"
  aria-label={`Get a quote for ${service.title}`}
  sx={{
    py: 1.35,
    fontWeight: 900,
    fontSize: { xs: "1.02rem", md: "1.05rem" },
    textTransform: "none",
    borderRadius: 999,
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
  );
};

export default ServiceCardGrid;
