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
    display: "inline-flex",
    alignItems: "center",
    minHeight: 44,
    px: 1,
    mx: -1,
    fontSize: "0.8rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: "rgba(255,255,255,0.4)",
    transition: "color 0.15s ease",
    "&:hover": { color: "rgba(255,255,255,0.9)" },
  };

  const FooterLink = ({ item }: { item: NavItem }) => {
    const isRoute = item.to.startsWith("/");
    if (isRoute) {
      return (
        <MuiLink
          component={NavLink}
          to={item.to}
          end
          underline="none"
          sx={{ ...linkSx, "&.active": { color: "common.white" } }}
        >
          {item.label}
        </MuiLink>
      );
    }
    return (
      <MuiLink
        underline="none"
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

  const Dot = () => (
    <Box
      aria-hidden
      sx={{
        width: 3,
        height: 3,
        borderRadius: "50%",
        bgcolor: "rgba(255,255,255,0.15)",
        flexShrink: 0,
      }}
    />
  );

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#09090b",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        py: { xs: 3, md: 3.5 },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={{ xs: 2.5, sm: 2 }}
        >
          {/* Brand + copyright */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.55)",
              whiteSpace: "nowrap",
            }}
          >
            © {currentYear} Insight Solutions
          </Typography>

          {/* Nav links */}
          <Stack
            component="nav"
            aria-label="Footer navigation"
            direction="row"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
            justifyContent="center"
          >
            {navLinks.map((item, i) => (
              <Stack
                key={item.label}
                direction="row"
                alignItems="center"
                gap={2}
              >
                {i > 0 && <Dot />}
                <FooterLink item={item} />
              </Stack>
            ))}
          </Stack>

          {/* Legal */}
          <Stack direction="row" alignItems="center" gap={2}>
            {[
              { label: "Privacy", to: "/privacy" },
              { label: "Terms", to: "/terms" },
            ].map((item, i) => (
              <Stack
                key={item.label}
                direction="row"
                alignItems="center"
                gap={2}
              >
                {i > 0 && <Dot />}
                <MuiLink
                  component={NavLink}
                  to={item.to}
                  underline="none"
                  sx={linkSx}
                >
                  {item.label}
                </MuiLink>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
