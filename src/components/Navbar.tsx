// src/components/Navbar.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  Fab,
  Fade,
  Container,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import navItemsData from "../data/navItems.json";

interface NavItem {
  label: string;
  to: string;
}

const DESKTOP_HEIGHT = 112;
const MOBILE_HEIGHT = 88;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = useMemo(() => navItemsData as NavItem[], []);

  /* ---------------- Active logic ---------------- */
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveSection((prev) => prev || "home");
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  const isActiveItem = (to: string) => {
    if (location.pathname === "/") {
      if (to.startsWith("/")) return false;
      return activeSection ? to === activeSection : to === "home";
    }
    return to.startsWith("/") && location.pathname === to;
  };

  const handleNavClick = (to: string) => {
    if (to.startsWith("/")) {
      setActiveSection("");
      navigate(to);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        setActiveSection(to);
        to === "home"
          ? window.scrollTo({ top: 0, behavior: "smooth" })
          : document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return;
    }

    setActiveSection(to);
    to === "home"
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------------- Styles ---------------- */
  const navLinkSx = (active: boolean) => ({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
    paddingInline: "18px",
    textDecoration: "none",
    color: "common.white",
    fontWeight: 800,
    fontSize: "1.25rem",
    letterSpacing: 0.2,
    borderRadius: 0,
    backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
    transition: "background-color 140ms ease",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
    },

    /* ✅ underline is now BELOW the text */
    "&::after": {
      content: '""',
      position: "absolute",
      top: "100%",        // anchor to text bottom
      marginTop: "6px",   // space below word
      left: 18,
      right: 18,
      height: 2,
      backgroundColor: "rgba(20,184,166,0.95)",
      transform: active ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "center",
      transition: "transform 160ms ease",
    },
  });

  /* ---------------- Drawer ---------------- */
  const drawer = (
    <Box sx={{ width: 380, height: "100%", bgcolor: "background.default" }}>
      <Box
        sx={{
          px: 3,
          py: 2.5,
          background: "linear-gradient(135deg, #050A14, #0B1220)",
          color: "common.white",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 950, fontSize: "1.5rem" }}>Menu</Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      <List sx={{ p: 1.5 }}>
        {navItems.map((item) => {
          const active = isActiveItem(item.to);
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  setMobileOpen(false);
                  handleNavClick(item.to);
                }}
                sx={{
                  py: 2,
                  px: 2.5,
                  borderRadius: 0,
                  bgcolor: active ? "rgba(20,184,166,0.14)" : "transparent",
                  "& .MuiListItemText-primary": {
                    fontWeight: 900,
                    fontSize: "1.25rem",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  /* ---------------- Render ---------------- */
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          minHeight: { xs: MOBILE_HEIGHT, md: DESKTOP_HEIGHT },
          zIndex: theme.zIndex.modal + 20,
          borderBottom: "none", // IMPORTANT: no competing line
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: "inherit" }}>
          <Container
            maxWidth="xl"
            sx={{ display: "flex", alignItems: "center", px: { xs: 2.5, md: 6 } }}
          >
            <Typography
              component={NavLink}
              to="/"
              onClick={() => setActiveSection("home")}
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "common.white",
                fontWeight: 1000,
                fontSize: { xs: "1.6rem", md: "2.1rem" },
                letterSpacing: 0.2,
              }}
            >
              Insight Web Solutions
            </Typography>

            {!isMobile && (
              <Box component="nav" sx={{ display: "flex", height: "100%" }}>
                {navItems.map((item) =>
                  item.to.startsWith("/") ? (
                    <Box
                      key={item.label}
                      component={NavLink}
                      to={item.to}
                      sx={navLinkSx(isActiveItem(item.to))}
                    >
                      {item.label}
                    </Box>
                  ) : (
                    <Box
                      key={item.label}
                      component="a"
                      href={`#${item.to}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.to);
                      }}
                      sx={navLinkSx(isActiveItem(item.to))}
                    >
                      {item.label}
                    </Box>
                  )
                )}
              </Box>
            )}

            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "white" }}>
                <MenuIcon sx={{ fontSize: 38 }} />
              </IconButton>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ "& .MuiDrawer-paper": { borderRadius: 0 } }}
      >
        {drawer}
      </Drawer>

      <Fade in={showScrollTop}>
        <Fab
          color="secondary"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            borderRadius: 0,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Fade>
    </>
  );
}
