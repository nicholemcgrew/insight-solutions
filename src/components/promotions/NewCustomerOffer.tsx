import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { LocalOffer as LocalOfferIcon } from "@mui/icons-material";

interface NewCustomerOfferProps {
  href: string;
}

export default function NewCustomerOffer({ href }: NewCustomerOfferProps) {
  // Keep the offer block reusable across pages while preserving the same message.
  return (
    <Box
      component="aside"
      aria-label="New customer special"
      sx={(t) => ({
        width: "100%",
        maxWidth: 980,
        textAlign: "left",
        borderRadius: 3,
        px: { xs: 2.5, md: 3 },
        py: { xs: 2.25, md: 2 },
        border: `1px solid ${t.palette.divider}`,
        boxShadow: "0 12px 28px rgba(2, 6, 23, 0.08)",
      })}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
        <Box
          aria-hidden
          sx={(t) => ({
            display: "grid",
            placeItems: "center",
            width: 52,
            height: 52,
            borderRadius: 999,
            bgcolor: t.palette.secondary.main,
            color: t.palette.secondary.contrastText,
          })}
        >
          <LocalOfferIcon aria-hidden />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography component="p" fontWeight={950} sx={{ m: 0 }}>
            New Customer Special
          </Typography>
          <Typography component="p" color="text.secondary" sx={{ m: 0 }}>
            Get <strong>20% off your first project</strong> plus a{" "}
            <strong>free 30-minute consultation</strong>.
          </Typography>
        </Box>

        <Typography
          component="a"
          href={href}
          sx={(t) => ({
            fontWeight: 900,
            textDecoration: "none",
            color: t.palette.secondary.contrastText,
            bgcolor: t.palette.secondary.main,
            px: 3,
            py: 1.25,
            borderRadius: 999,
            "&:focus-visible": {
              outline: `3px solid ${t.palette.primary.main}`,
              outlineOffset: 3,
            },
          })}
        >
          Claim offer →
        </Typography>
      </Stack>
    </Box>
  );
}
