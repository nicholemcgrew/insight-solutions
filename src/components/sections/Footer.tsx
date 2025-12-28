import { useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Stack,
  Divider,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import navItemsData from "../../data/navItemsData.json";


interface NavItem {label: string;
  to: string; // "/pricing" OR section id like "services"
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navLinks: NavItem[] = useMemo(() => navItemsData as NavItem[], []);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /**
   * 508 + UX:
   * - Use real links/buttons with keyboard support.
   * - Avoid react-scroll dependency + avoid broken behavior on non-home routes.
   */
  const handleSectionLink = (id: string) => {
    if (id === "home") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 0);
    } else {
      scrollToSection(id);
    }
  };

  const FooterLink = ({ item }: { item: NavItem }) => {
    const isRoute = item.to.startsWith("/");
// Route links (like /pricing)
    if (isRoute) {
      return (
        <MuiLink
          component={NavLink}
          to={item.to}
          end
          color="inherit"
          underline="hover"
          sx={(t) => ({
            fontWeight: 800,
            fontSize: { xs: "1.05rem", sm: "1.125rem" },
            lineHeight: 1.2,
            borderRadius: 1,
            px: 1,
            py: 0.5,
            "&:hover": { color: "secondary.main" },
            "&.active": {
              color: t.palette.getContrastText(t.palette.secondary.main),
              backgroundColor: "secondary.main",
            },
            "&:focus-visible": {
              outline: "3px solid white",
              outlineOffset: 3,
            },
          })}
        >
          {item.label}
        </MuiLink>
      );
    }

    // Section links (ids on the home page)
    return (
      <MuiLink
        href={item.to === "home" ? "/" : `/#${item.to}`}
        color="inherit"
        underline="hover"
        onClick={(e) => {
          e.preventDefault();
          handleSectionLink(item.to);
        }}
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1.05rem", sm: "1.125rem" },
          lineHeight: 1.2,
          cursor: "pointer",
          borderRadius: 1,
          px: 1,
          py: 0.5,
          "&:hover": { color: "secondary.main" },
          "&:focus-visible": {
            outline: "3px solid white",
            outlineOffset: 3,
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
      aria-label="Site footer"
      sx={{
        bgcolor: "primary.main",
        color: "common.white",
        mt: { xs: 10, md: 12 },
        pt: { xs: 6, md: 8 },
        pb: { xs: 5, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Top: brand + nav */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems={{ xs: "center", md: "flex-start" }}
          justifyContent="space-between"
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          {/* Brand */}
          <Box sx={{ maxWidth: 520 }}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontWeight: 900,
                letterSpacing: 0.3,
                fontSize: { xs: "1.35rem", sm: "1.5rem" },
                lineHeight: 1.15,
                mb: 1,
              }}
            >
              Insight Web Solutions
            </Typography>

            <Typography
              variant="body2"
              component="p"
              sx={{
                fontSize: { xs: "1rem", sm: "1.05rem" },
                lineHeight: 1.6,
                opacity: 0.92,
              }}
            >
              Websites that are fast, accessible (508/WCAG), and built to convert.
            </Typography>
          </Box>

          {/* Nav */}
          <Box component="nav" aria-label="Footer navigation">
            <Typography
              component="p"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.1rem", sm: "1.2rem" },
                mb: 1.5,
                letterSpacing: 0.2,
              }}
            >
              Explore
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row", md: "column" }}
              spacing={{ xs: 1.5, sm: 2.5, md: 1.75 }}
              alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
            >
              {navLinks.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: "rgba(255,255,255,0.18)" }} />

        {/* Bottom: legal + copyright */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          alignItems={{ xs: "center", sm: "center" }}
          justifyContent="space-between"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography
            variant="body2"
            component="p"
            sx={{ fontSize: { xs: "0.95rem", sm: "1rem" }, opacity: 0.92 }}
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
                fontWeight: 800,
                "&:focus-visible": {
                  outline: "3px solid white",
                  outlineOffset: 3,
                  borderRadius: 1,
                },
              }}
              itemProp="copyrightHolder"
            >
              Insight Web Solutions
            </MuiLink>
            . All rights reserved.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.25, sm: 2.5 }}
            alignItems="center"
          >
            <MuiLink
              component={NavLink}
              to="/privacy"
              color="inherit"
              underline="hover"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                "&:hover": { color: "secondary.main" },
                "&:focus-visible": {
                  outline: "3px solid white",
                  outlineOffset: 3,
                  borderRadius: 1,
                },
              }}
            >
              Privacy Policy
            </MuiLink>

            <MuiLink
              component={NavLink}
              to="/terms"
              color="inherit"
              underline="hover"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                "&:hover": { color: "secondary.main" },
                "&:focus-visible": {
                  outline: "3px solid white",
                  outlineOffset: 3,
                  borderRadius: 1,
                },
              }}
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
