import React from "react";
import { Box, ButtonBase, Card, CardContent, Typography } from "@mui/material";
import { Service } from "../../../types/services";

interface ServiceCardProps {
  service: Service;
  href: string;
  icon: React.ReactNode;
  reducedMotion: boolean;
}

export default function ServiceCard({ service, href, icon, reducedMotion }: ServiceCardProps) {
  // Make each card a single accessible link with consistent sizing and aligned CTAs.
  return (
    <ButtonBase
      component="a"
      href={href}
      aria-label={`Get a quote for ${service.title}`}
      sx={(t) => ({
        width: "100%",
        display: "flex",
        alignItems: "stretch",
        borderRadius: 3,
        transition: reducedMotion ? "none" : "transform 180ms ease",
        "&:hover": {
          transform: reducedMotion ? "none" : "translateY(-4px)",
        },
        "&:focus-visible": {
          outline: `3px solid ${t.palette.secondary.main}`,
          outlineOffset: 4,
        },
      })}
    >
      <Card
        component="article"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: 3,
          }}
        >
          <Box mb={2}>{icon}</Box>

          <Typography component="h3" fontWeight={950} mb={1.5}>
            {service.title}
          </Typography>

          <Typography component="p" color="text.secondary" mb={2}>
            {service.description}
          </Typography>

          <Box sx={{ mt: "auto" }}>
            <Typography component="p" fontWeight={900} color="primary" mb={1}>
              {service.price}
            </Typography>

            <Typography
              component="p"
              sx={{
                fontWeight: 900,
                color: "secondary.main",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                m: 0,
              }}
            >
              Get quote →
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

export {};
