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

  const linkSx = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    minWidth: 48,
    px: 2,
    mx: -1,
    borderRadius: 1,
    color: "#e0e0e0",
    fontSize: "0.95rem",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#ffffff",
      bgcolor: "rgba(255,255,255,0.08)",
    },
  };

  const FooterLink = ({ item }: { item: NavItem }) => {
    const isRoute = item.to.startsWith("/");

    if (isRoute) {
      return (
        <MuiLink component={NavLink} to={item.to} end sx={linkSx}>
          {item.label}
        </MuiLink>
      );
    }

    return (
      <MuiLink
        onClick={(e) => {
          e.preventDefault();
          handleSectionLink(item.to);
        }}
        sx={{ ...linkSx, cursor: "pointer" }}
      >
        {item.label}
      </MuiLink>
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        py: { xs: 6, md: 8 },
        color: "#e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 4, md: 3 }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.01em",
              color: "#ffffff",
            }}
          >
            Insight Solutions
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 3, sm: 4, md: 5 }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {navLinks.map((item) => (
              <FooterLink key={item.label} item={item} />
            ))}
          </Stack>

          <Stack direction="row" spacing={3} alignItems="center">
            <MuiLink component={NavLink} to="/privacy" sx={linkSx}>
              Privacy
            </MuiLink>
            <MuiLink component={NavLink} to="/terms" sx={linkSx}>
              Terms
            </MuiLink>
          </Stack>
        </Stack>

        <Divider sx={{ my: 5, borderColor: "rgba(255,255,255,0.08)" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#ffffff",
            fontSize: "0.875rem",
          }}
        >
          © {currentYear} Insight Solutions. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
