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
  const [showScrollTop, setShowScrollTop] = useState(false); // ← NEW
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems: NavItem[] = navItemsData as NavItem[];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // ← SCROLL TO TOP LOGIC
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
            <ListItemButton
              onClick={() => {
                handleDrawerToggle();
                document
                  .getElementById(item.to)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* SKIP LINK */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: -9999,
          zIndex: theme.zIndex.appBar + 1,
          "&:focus-within": { left: 8, top: 8 },
        }}
      >
        <Link
          to="main-content"
          smooth
          duration={500}
          tabIndex={0}
          style={{
            position: "fixed",
            top: -9999,
            left: -9999,
            background: "white",
            color: "#1976d2",
            padding: "8px 12px",
            fontWeight: 600,
            zIndex: 9999,
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
          onFocus={(e) => {
            e.target.style.top = "16px";
            e.target.style.left = "16px";
          }}
          onBlur={(e) => {
            e.target.style.top = "-9999px";
            e.target.style.left = "-9999px";
          }}
        >
          Skip to main content
        </Link>
      </Box>

      <AppBar
        position="sticky"
        sx={{ bgcolor: "primary.main", zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Insight Web Solutions
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open menu"
              aria-controls="mobile-drawer"
              aria-expanded={mobileOpen}
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
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  to={item.to}
                  smooth
                  duration={500}
                  aria-label={`Go to ${item.label}`}
                  sx={{
                    "&:focus-visible": {
                      outline: "2px solid white",
                      outlineOffset: "2px",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>

        <Drawer
          id="mobile-drawer"
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

      {/* SCROLL TO TOP BUTTON */}
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
