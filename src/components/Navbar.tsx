// src/components/Navbar.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
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
  to: string; // "/pricing" OR section id like "services"
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = useMemo(() => navItemsData as NavItem[], []);

  const isPricingPage = location.pathname === "/pricing";

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  // 508: allow keyboard users to close drawer with Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Scroll-to-top button visibility
  useEffect(() => {
    const toggleVisibility = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /**
   * SEO/UX: avoid window.location.href reloads.
   * Use react-router navigation, then scroll if needed.
   */
  const handleNavClick = (to: string) => {
    // Route
    if (to.startsWith("/")) {
      navigate(to);
      return;
    }

    // Sections (ids)
    if (to === "home") {
      if (location.pathname !== "/") {
        navigate("/");
        // Wait a tick for route to render, then scroll.
        setTimeout(() => scrollToTop(), 0);
      } else {
        scrollToTop();
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(to), 0);
    } else {
      scrollToSection(to);
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 320,
        bgcolor: "background.default",
        height: "100%",
      }}
      role="presentation"
      aria-label="Mobile navigation menu"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          component="span"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.125rem", sm: "1.25rem" },
            letterSpacing: 0.2,
          }}
        >
          Menu
        </Typography>

        <IconButton onClick={handleDrawerToggle} aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      <List sx={{ py: 1 }}>
        {navItems.map((item) => {
          const isPricing = item.to === "/pricing";

          return (
            <ListItem key={item.label} disablePadding>
              {isPricing ? (
                <ListItemButton
                  component={NavLink}
                  to={item.to}
                  end
                  onClick={() => setMobileOpen(false)}
                  sx={(t) => ({
                    textAlign: "left",
                    py: 1.75,
                    px: 3,
                    fontSize: "1.05rem",
                    "& .MuiListItemText-primary": {
                      fontWeight: 700,
                      fontSize: "1.05rem",
                    },
                    ...(isPricingPage && {
                      bgcolor: "secondary.main",
                      color: t.palette.getContrastText(t.palette.secondary.main),
                      "&:hover": { bgcolor: "secondary.dark" },
                    }),
                    "&:focus-visible": {
                      outline: `3px solid ${t.palette.primary.main}`,
                      outlineOffset: 2,
                    },
                  })}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ) : (
                <ListItemButton
                  onClick={() => {
                    setMobileOpen(false);
                    handleNavClick(item.to);
                  }}
                  sx={(t) => ({
                    textAlign: "left",
                    py: 1.75,
                    px: 3,
                    "& .MuiListItemText-primary": {
                      fontWeight: 700,
                      fontSize: "1.05rem",
                    },
                    "&:focus-visible": {
                      outline: `3px solid ${t.palette.primary.main}`,
                      outlineOffset: 2,
                    },
                  })}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* 508: skip link target should exist in your main layout: <main id="main-content"> */}
      <AppBar
        component="header"
        position="sticky"
        color="primary"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          boxShadow: 3,
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            py: { xs: 1.25, sm: 1.5 },
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: { xs: 2, sm: 3 },
            }}
          >
            {/* Brand / Site name */}
            <Typography
              component={NavLink}
              to="/"
              variant="h6"
              aria-label="Insight Web Solutions home"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "common.white",
                fontWeight: 900,
                letterSpacing: 0.3,
                fontSize: { xs: "1.2rem", sm: "1.35rem", md: "1.55rem" },
                lineHeight: 1.1,
                "&:focus-visible": {
                  outline: "3px solid white",
                  outlineOffset: 3,
                  borderRadius: 1,
                },
              }}
            >
              Insight Web Solutions
            </Typography>

            {/* Desktop nav */}
            {!isMobile && (
              <Box
                component="nav"
                aria-label="Main navigation"
                sx={{ display: "flex", gap: 1 }}
              >
                {navItems.map((item) => {
                  const isPricing = item.to === "/pricing";

                  if (isPricing) {
                    return (
                      <Button
                        key={item.label}
                        component={NavLink}
                        to={item.to}
                        end
                        color="inherit"
                        sx={(t) => ({
                          fontWeight: 800,
                          textTransform: "none",
                          fontSize: { md: "1.05rem", lg: "1.125rem" },
                          px: 2,
                          py: 1.25,
                          borderRadius: 2,
                          "&.active": {
                            bgcolor: t.palette.secondary.main,
                            color: t.palette.getContrastText(
                              t.palette.secondary.main
                            ),
                          },
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.14)",
                          },
                          "&:focus-visible": {
                            outline: "3px solid white",
                            outlineOffset: 2,
                          },
                        })}
                      >
                        {item.label}
                      </Button>
                    );
                  }

                  return (
                    <Button
                      key={item.label}
                      color="inherit"
                      onClick={() => handleNavClick(item.to)}
                      sx={{
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: { md: "1.05rem", lg: "1.125rem" },
                        px: 2,
                        py: 1.25,
                        borderRadius: 2,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.14)" },
                        "&:focus-visible": {
                          outline: "3px solid white",
                          outlineOffset: 2,
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="Open menu"
                aria-controls={mobileOpen ? "mobile-nav-drawer" : undefined}
                aria-expanded={mobileOpen ? "true" : undefined}
                onClick={handleDrawerToggle}
                sx={{
                  p: 1.25,
                  "&:focus-visible": {
                    outline: "3px solid white",
                    outlineOffset: 2,
                  },
                }}
              >
                <MenuIcon sx={{ fontSize: 34 }} />
              </IconButton>
            )}
          </Container>
        </Toolbar>

        {/* Mobile drawer */}
        <Drawer
          id="mobile-nav-drawer"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 320,
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>

      {/* Scroll-to-top */}
      <Fade in={showScrollTop}>
        <Fab
          color="secondary"
          size="large"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: { xs: 20, sm: 28 },
            right: { xs: 20, sm: 28 },
            zIndex: theme.zIndex.tooltip,
            boxShadow: 8,
            "&:hover": { transform: "translateY(-2px)" },
            "&:focus-visible": {
              outline: (t) => `3px solid ${t.palette.common.white}`,
              outlineOffset: 3,
            },
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: 34 }} />
        </Fab>
      </Fade>
    </>
  );
};

export default Navbar;
