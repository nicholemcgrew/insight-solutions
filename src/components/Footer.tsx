// src/components/Footer.tsx
import React from "react";
import { Box, Container, Typography, Link as MuiLink, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import navItems from "../data/navItems.json";

interface NavItem {
  label: string;
  to: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navLinks: NavItem[] = navItems as NavItem[];

  // Helper – decide which link component to use
  const FooterLink = ({ item }: { item: NavItem }) => {
    const isPricing = item.to === "/pricing";

    if (isPricing) {
      return (
        <MuiLink
          component={NavLink}
          to={item.to}
          end
          color="inherit"
          underline="hover"
          sx={{
            fontWeight: 500,
            fontSize: { xs: "0.9375rem", sm: "1rem" },
            transition: "color 0.2s",
            "&:hover": { color: "secondary.main" },
            "&:focus-visible": {
              outline: "2px solid white",
              outlineOffset: "2px",
              borderRadius: 1,
            },
          }}
        >
          {item.label}
        </MuiLink>
      );
    }

    // All other links → smooth scroll on the same page
    return (
      <MuiLink
        component={ScrollLink}
        to={item.to}
        smooth
        duration={500}
        color="inherit"
        underline="hover"
        sx={{
          fontWeight: 500,
          fontSize: { xs: "0.9375rem", sm: "1rem" },
          transition: "color 0.2s",
          cursor: "pointer",
          "&:hover": { color: "secondary.main" },
          "&:focus-visible": {
            outline: "2px solid white",
            outlineOffset: "2px",
            borderRadius: 1,
          },
        }}
      >
        {item.label}
      </MuiLink>
    );
  };

  return (
    <Box
      component="footer"
      role="contentinfo"
      aria-label="Site footer with navigation and copyright"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: { xs: 3, md: 4 },
        mt: "auto",
      }}
    >
      <Container>
        <Stack
          spacing={{ xs: 3, sm: 2 }}
          alignItems="center"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          {/* Navigation Links */}
          <Box component="nav" aria-label="Footer navigation" sx={{ width: "100%" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
            >
              {navLinks.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </Stack>
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            component="p"
            sx={{ mb: 0, fontSize: "0.875rem" }}
            itemProp="copyrightNotice"
          >
            © {currentYear}{" "}
            <MuiLink
              component={NavLink}
              to="/"
              end
              color="inherit"
              underline="hover"
              sx={{
                "&:focus-visible": {
                  outline: "2px solid white",
                  outlineOffset: "2px",
                },
              }}
              itemProp="copyrightHolder"
            >
              Insight Web Solutions
            </MuiLink>
            . All rights reserved.
          </Typography>

          {/* Legal Links */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} fontSize="0.8125rem">
            <MuiLink
              href="/privacy"
              color="inherit"
              underline="hover"
              sx={{ "&:focus-visible": { outline: "2px solid white", outlineOffset: "2px" } }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="/terms"
              color="inherit"
              underline="hover"
              sx={{ "&:focus-visible": { outline: "2px solid white", outlineOffset: "2px" } }}
            >
              Terms of Service
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;