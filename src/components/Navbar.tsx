import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-scroll";

const navItems = [
  { label: "Home", to: "home" },
  { label: "Services", to: "services" },
  { label: "Portfolio", to: "portfolio" },
  { label: "Pricing", to: "pricing" },
  { label: "About", to: "about" },
  { label: "Contact", to: "contact" },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md = 900px; adjust to 'sm' = 600px if needed

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, bgcolor: "background.default" }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton onClick={handleDrawerToggle} aria-label="close drawer">
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
                // Scroll to section
                const element = document.getElementById(item.to);
                element?.scrollIntoView({ behavior: "smooth" });
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
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.to}
                smooth
                duration={500}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </Button>
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
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
