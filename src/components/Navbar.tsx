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
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-scroll";

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

  const navItems: NavItem[] = navItemsData as NavItem[];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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

  const handleMobileClick = (to: string) => {
    handleDrawerToggle();
    if (!to.startsWith("/")) {
      setTimeout(() => {
        document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const drawer = (
    <Box sx={{ width: 250, bgcolor: "background.default" }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton onClick={handleDrawerToggle} aria-label="close menu">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            {item.to.startsWith("/") ? (
              <ListItemButton component={NavLink} to={item.to} onClick={handleDrawerToggle}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <ListItemButton onClick={() => handleMobileClick(item.to)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "primary.main", zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Insight Web Solutions
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box component="nav" aria-label="Main navigation" sx={{ display: "flex", gap: 2 }}>
              {navItems.map((item) => (
                item.to.startsWith("/") ? (
                  <Button
                    key={item.label}
                    color="inherit"
                    component={NavLink}
                    to={item.to}
                    end
                    aria-label={`Go to ${item.label}`}
                    sx={{
                      "&.active": { fontWeight: 700 },
                      "&:focus-visible": { outline: "2px solid white", outlineOffset: "2px" },
                    }}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={item.label}
                    color="inherit"
                    component={Link}
                    to={item.to}
                    smooth
                    duration={500}
                    aria-label={`Go to ${item.label}`}
                    sx={{
                      "&:focus-visible": { outline: "2px solid white", outlineOffset: "2px" },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              ))}
            </Box>
          )}
        </Toolbar>

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
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Fade>
    </>
  );
};

export default Navbar;