import { useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Stack,
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
    minHeight: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    px: 1.25,
    borderRadius: 999,
    color: "#D7DBE3",
    fontSize: "0.95rem",
    fontWeight: 600,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background-color 150ms ease, color 150ms ease",
    "&:hover": {
      color: "#FFFFFF",
      bgcolor: "rgba(255,255,255,0.08)",
    },
  } as const;

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
        bgcolor: "#070A12",
        color: "#D7DBE3",
        py: { xs: 2.5, sm: 3.25 },
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={1.75}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            spacing={{ xs: 1.25, md: 2 }}
          >
            <Typography
              sx={{
                fontWeight: 950,
                fontSize: "1.12rem",
                color: "#FFFFFF",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
              }}
            >
              Insight Solutions
            </Typography>

            <Stack
              component="nav"
              aria-label="Footer navigation"
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "flex-start", md: "center" }}
              flexWrap="wrap"
              gap={{ xs: 0.5, sm: 0.75 }}
              sx={{ flex: 1, px: { md: 2 }, minWidth: 0 }}
            >
              {navLinks.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}

              <MuiLink component={NavLink} to="/privacy" sx={linkSx}>
                Privacy
              </MuiLink>
              <MuiLink component={NavLink} to="/terms" sx={linkSx}>
                Terms
              </MuiLink>
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            spacing={{ xs: 0.75, md: 1 }}
          >
            <Typography sx={{ fontSize: "0.82rem", opacity: 0.7 }}>
              Fast. Accessible. Built to convert.
            </Typography>

            <Typography sx={{ fontSize: "0.82rem", opacity: 0.7 }}>
              © {currentYear} Insight Solutions. All rights reserved.
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
