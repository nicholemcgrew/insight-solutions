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

interface NavItem {
  label: string;
  to: string;
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

    if (isRoute) {
      return (
        <MuiLink
          component={NavLink}
          to={item.to}
          end
          color="inherit"
          underline="none"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.05rem" },
            transition: "color 0.25s ease",
            "&:hover": { color: "secondary.light" },
            "&.active": { color: "secondary.light", fontWeight: 800 },
          }}
        >
          {item.label}
        </MuiLink>
      );
    }

    return (
      <MuiLink
        color="inherit"
        underline="none"
        onClick={(e) => {
          e.preventDefault();
          handleSectionLink(item.to);
        }}
        sx={{
          fontWeight: 600,
          fontSize: { xs: "1rem", sm: "1.05rem" },
          cursor: "pointer",
          transition: "color 0.25s ease",
          "&:hover": { color: "secondary.light" },
        }}
      >
        {item.label}
      </MuiLink>
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "grey.300",
        mt: "auto",
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
        borderTop: "1px solid",
        borderColor: "grey.800",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <Box sx={{ maxWidth: 380, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.4rem", md: "1.55rem" },
                letterSpacing: 0.5,
                color: "common.white",
                mb: 1.5,
              }}
            >
              Insight Web Solutions
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7, opacity: 0.85 }}>
              Fast. Accessible. Built to convert.
            </Typography>
          </Box>

          <Stack
            component="nav"
            aria-label="Footer navigation"
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2.5, sm: 5, md: 6 }}
            alignItems="center"
            justifyContent={{ xs: "center", md: "center" }}
            flexWrap="wrap"
          >
            {navLinks.map((item) => (
              <FooterLink key={item.label} item={item} />
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: { xs: 5, md: 6 }, borderColor: "grey.800" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 4 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} Insight Web Solutions. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={4} alignItems="center">
            <MuiLink
              component={NavLink}
              to="/privacy"
              color="inherit"
              underline="hover"
              sx={{
                fontSize: "0.95rem",
                fontWeight: 500,
                transition: "color 0.25s ease",
                "&:hover": { color: "secondary.light" },
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
                fontSize: "0.95rem",
                fontWeight: 500,
                transition: "color 0.25s ease",
                "&:hover": { color: "secondary.light" },
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