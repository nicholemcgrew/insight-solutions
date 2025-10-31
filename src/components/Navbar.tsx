// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import navItemsData from "../data/navItems.json";

interface NavItem {
  label: string;
  to: string;
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const navItems: NavItem[] = navItemsData as NavItem[];

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  // Scroll-to-top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isPricingPage = location.pathname === "/pricing";

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, bgcolor: "background.default" }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton onClick={handleDrawerToggle} aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => {
          const isPricing = item.to === "/pricing";
          const isHome = item.to === "home";

          return (
            <ListItem key={item.label} disablePadding>
              {isPricing ? (
                <ListItemButton
                  component={NavLink}
                  to={item.to}
                  end
                  onClick={handleDrawerToggle}
                  sx={{
                    textAlign: "center",
                    bgcolor: isPricingPage ? "secondary.main" : "transparent",
                    color: isPricingPage ? "white" : "inherit",
                    "&:hover": {
                      bgcolor: isPricingPage ? "secondary.dark" : "action.hover",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ) : (
                <ListItemButton
                  onClick={() => {
                    handleDrawerToggle();
                    if (isHome) {
                      window.location.href = "/";
                    } else if (location.pathname !== "/") {
                      window.location.href = `/#${item.to}`;
                    } else {
                      setTimeout(() => {
                        document.getElementById(item.to)?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  sx={{ textAlign: "center" }}
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
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "primary.main",
          zIndex: theme.zIndex.drawer + 1,
          boxShadow: 2,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: "white", fontWeight: 600 }}
          >
            Insight Web Solutions
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="Open menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box
              component="nav"
              aria-label="Main navigation"
              sx={{ display: "flex", gap: 2 }}
            >
              {navItems.map((item) => {
                const isPricing = item.to === "/pricing";
                const isHome = item.to === "home";

                return isPricing ? (
                  <Button
                    key={item.label}
                    color="inherit"
                    component={NavLink}
                    to={item.to}
                    end
                    sx={{
                      fontWeight: 500,
                      textTransform: "none",
                      "&.active": {
                        fontWeight: 700,
                        color: "secondary.main",
                      },
                      "&:focus-visible": {
                        outline: "2px solid white",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={item.label}
                    color="inherit"
                    component={ScrollLink}
                    to={item.to}
                    smooth
                    duration={500}
                    offset={-80}
                    onClick={() => {
                      if (isHome) {
                        window.location.href = "/";
                      } else if (location.pathname !== "/") {
                        window.location.href = `/#${item.to}`;
                      }
                    }}
                    sx={{
                      fontWeight: 500,
                      textTransform: "none",
                      cursor: "pointer",
                      "&:focus-visible": {
                        outline: "2px solid white",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>

      {/* Scroll to Top Button */}
      <Fade in={showScrollTop}>
        <Fab
          color="secondary"
          size="medium"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: theme.zIndex.tooltip,
            boxShadow: 6,
            "&:hover": { transform: "translateY(-2px)" },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Fade>
    </>
  );
};

export default Navbar;