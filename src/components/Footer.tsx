// src/components/Footer.tsx
import React from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import navItems from "../data/navItems.json";

interface NavItem {
  label: string;
  to: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navLinks: NavItem[] = navItems as NavItem[];

  return (
    <Box
      component="footer"
      role="contentinfo"
      aria-label="Site footer with navigation and copyright"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: { xs: 3, md: 4 },
        mt: "auto", // Push to bottom in flex layout
      }}
    >
      <Container>
        <Stack
          spacing={{ xs: 3, sm: 2 }}
          alignItems="center"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          {/* Navigation Links */}
          <Box
            component="nav"
            aria-label="Footer navigation"
            sx={{ width: "100%" }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={`#${item.to}`}
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
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.to)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item.label}
                </Link>
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
            <Link
              href="/"
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
            </Link>
            . All rights reserved.
          </Typography>

          {/* Legal Links */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} fontSize="0.8125rem">
            <Link
              href="/privacy"
              color="inherit"
              underline="hover"
              sx={{ "&:focus-visible": { outline: "2px solid white", outlineOffset: "2px" } }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              color="inherit"
              underline="hover"
              sx={{ "&:focus-visible": { outline: "2px solid white", outlineOffset: "2px" } }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;