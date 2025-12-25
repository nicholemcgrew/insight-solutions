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
  Container,
  Button,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import navItemsData from "../data/navItems.json";

interface NavItem {
  label: string;
  to: string;
}

export const NAVBAR_HEIGHT = {
  mobile: 64,
  desktop: 80,
};

// Keep this aligned with your isMobile breakpoint (down("lg"))
function getHeaderOffsetPx(isMobile: boolean) {
  return isMobile ? NAVBAR_HEIGHT.mobile : NAVBAR_HEIGHT.desktop;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

// This makes nav clicks work whether you're scrolling the window OR a custom scroller (#main-content)
function scrollToSection(id: string, headerOffset: number) {
  const target = document.getElementById(id);
  if (!target) return;

  const scroller = document.getElementById("main-content");
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  // If you have a scrolling main container, scroll that. Otherwise, scroll window.
  if (scroller && scroller.scrollHeight > scroller.clientHeight) {
    // robust math: compute target's position relative to the scroller viewport
    const scrollerTop = scroller.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const top = Math.max(0, scroller.scrollTop + (targetTop - scrollerTop) - headerOffset);

    scroller.scrollTo({ top, behavior });
    return;
  }

  const rect = target.getBoundingClientRect();
  const top = Math.max(0, window.scrollY + rect.top - headerOffset);
  window.scrollTo({ top, behavior });
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const theme = useTheme();

  // iPad Pro is ~1024px, so using md (900px) keeps desktop nav on iPad and causes overflow.
  // Using lg makes iPad and smaller use the drawer.
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = useMemo(() => navItemsData as NavItem[], []);

  // IDs for 508 semantics
  const drawerTitleId = "mobile-menu-title";
  const drawerId = "mobile-menu";

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveSection((prev) => prev || "home");
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  useEffect(() => {
    const scroller = document.getElementById("main-content");
    const isUsingMainScroller = !!scroller && scroller.scrollHeight > scroller.clientHeight;

    const getScrollTop = () => (isUsingMainScroller ? scroller!.scrollTop : window.scrollY);
    const onScroll = () => setIsScrolled(getScrollTop() > 8);

    onScroll();
    const target = isUsingMainScroller ? scroller! : window;

    target.addEventListener("scroll", onScroll as any, { passive: true });
    return () => target.removeEventListener("scroll", onScroll as any);
  }, []);

  const isActiveItem = (to: string) => {
    if (location.pathname === "/") {
      if (to.startsWith("/")) return false;
      return activeSection ? to === activeSection : to === "home";
    }
    return to.startsWith("/") && location.pathname === to;
  };

  const getAriaCurrent = (to: string) => {
    const active = isActiveItem(to);
    if (!active) return undefined;
    return to.startsWith("/") ? ("page" as const) : ("location" as const);
  };

  const handleNavClick = (to: string) => {
    // whenever someone clicks nav, close the drawer first
    setMobileOpen(false);

    const headerOffset = getHeaderOffsetPx(isMobile);
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

    if (to.startsWith("/")) {
      setActiveSection("");
      navigate(to);
      return;
    }

    const doScroll = () => {
      setActiveSection(to);

      if (to === "home") {
        const scroller = document.getElementById("main-content");
        if (scroller && scroller.scrollHeight > scroller.clientHeight) {
          scroller.scrollTo({ top: 0, behavior });
        } else {
          window.scrollTo({ top: 0, behavior });
        }
        return;
      }

      scrollToSection(to, headerOffset);
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 0);
      return;
    }

    doScroll();
  };

  // Hover-only background. Underline tight under the word.
  // Add focus-visible so keyboard users have a clear indicator (508)
  const navLinkSx = (active: boolean) => ({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    px: 1.1,
    py: 0.7,
    textDecoration: "none",
    color: "common.white",
    fontWeight: 850,
    fontSize: "1.15rem",
    letterSpacing: "0.01em",
    borderRadius: 12,
    transition: "background-color 140ms ease, outline-color 140ms ease",

    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.10)",
    },

    "&:focus-visible": {
      outline: "3px solid rgba(255,255,255,0.85)",
      outlineOffset: 3,
    },

    "&::after": {
      content: '""',
      position: "absolute",
      left: 10,
      right: 10,
      bottom: 6,
      height: 3,
      borderRadius: 999,
      backgroundColor: "rgba(20,184,166,0.95)",
      transform: active ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "center",
      transition: "transform 160ms ease",
    },
  });

  const drawer = (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        width: { xs: "min(86vw, 360px)", sm: 360 },
        height: "100%",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.25,
          color: "common.white",
          backgroundImage: "linear-gradient(135deg, #050A14, #0B1220 60%, #0B1220)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography id={drawerTitleId} sx={{ fontWeight: 950, fontSize: "1.35rem" }}>
            Menu
          </Typography>

          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{
              color: "common.white",
              "&:focus-visible": { outline: "3px solid rgba(255,255,255,0.85)", outlineOffset: 3 },
            }}
            aria-label="Close menu"
          >
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
                onClick={() => handleNavClick(item.to)}
                aria-current={getAriaCurrent(item.to)}
                sx={{
                  py: 1.6,
                  px: 2,
                  borderRadius: 2,
                  bgcolor: active ? "rgba(20,184,166,0.14)" : "transparent",
                  "&:hover": { bgcolor: active ? "rgba(20,184,166,0.20)" : "rgba(2,6,23,0.06)" },
                  "&:focus-visible": {
                    outline: "3px solid rgba(2,6,23,0.55)",
                    outlineOffset: 2,
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: 900,
                    fontSize: "1.12rem",
                    color: "text.primary",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          onClick={() => {
            setMobileOpen(false);
            // SPA-friendly navigation + keeps hash/query (better UX/SEO than full reload)
            navigate("/?cta=true#contact");
          }}
          sx={{ fontWeight: 900, py: 1.3 }}
        >
          Get a Free Consult
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // IMPORTANT: keep the height breakpoint aligned with isMobile (lg)
          height: { xs: NAVBAR_HEIGHT.mobile, lg: NAVBAR_HEIGHT.desktop },
          zIndex: theme.zIndex.modal + 20,
          bgcolor: "transparent",
          transition: "background-color 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
          backgroundImage: isScrolled
            ? "linear-gradient(135deg, rgba(5,10,20,0.78), rgba(11,18,32,0.78))"
            : "linear-gradient(135deg, rgba(5,10,20,0.35), rgba(11,18,32,0.35))",
          backdropFilter: "saturate(160%) blur(14px)",
          WebkitBackdropFilter: "saturate(160%) blur(14px)",
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.10)",
          boxShadow: isScrolled ? "0 12px 34px rgba(0,0,0,0.22)" : "none",
        }}
      >
        <Toolbar disableGutters sx={{ height: "100%", minHeight: "unset !important" }}>
          <Container
            maxWidth={false}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              px: { xs: 2, sm: 3, md: 5 },
            }}
          >
            {/* left: logo always takes you home */}
            <Box sx={{ display: "flex", alignItems: "center", minWidth: "fit-content" }}>
              <Typography
                component={NavLink}
                to="/"
                onClick={(e) => {
                  // if already home, don't "navigate", just scroll to top
                  e.preventDefault();
                  handleNavClick("home");
                }}
                sx={{
                  textDecoration: "none",
                  color: "common.white",
                  fontWeight: 950,
                  letterSpacing: "-0.01em",
                  fontSize: { xs: "1.25rem", sm: "1.45rem", md: "1.65rem" },
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                  "&:focus-visible": {
                    outline: "3px solid rgba(255,255,255,0.85)",
                    outlineOffset: 4,
                    borderRadius: 10,
                  },
                }}
                aria-label="Go to home"
              >
                Insight Web Solutions
              </Typography>
            </Box>

            {/* desktop nav */}
            {!isMobile && (
              <Box
                component="nav"
                aria-label="Primary"
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.8,
                  px: { md: 2, lg: 3 },
                  minWidth: 0,
                }}
              >
                {navItems.map((item) =>
                  item.to.startsWith("/") ? (
                    <Box
                      key={item.label}
                      component={NavLink}
                      to={item.to}
                      aria-current={getAriaCurrent(item.to)}
                      sx={navLinkSx(isActiveItem(item.to))}
                    >
                      {item.label}
                    </Box>
                  ) : (
                    <Box
                      key={item.label}
                      component="a"
                      href={`#${item.to}`}
                      aria-current={getAriaCurrent(item.to)}
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

            {/* right: CTA or hamburger */}
            <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
              {!isMobile && (
                <Button
                  component={NavLink}
                  to="/?cta=true#contact"
                  variant="contained"
                  color="secondary"
                  size="medium"
                  sx={{
                    fontWeight: 900,
                    px: 2.25,
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                    fontSize: "1.02rem",
                    "&:focus-visible": {
                      outline: "3px solid rgba(255,255,255,0.85)",
                      outlineOffset: 4,
                    },
                  }}
                >
                  Free Consult
                </Button>
              )}

              {isMobile && (
                <IconButton
                  onClick={() => setMobileOpen((prev) => !prev)}
                  sx={{
                    color: "common.white",
                    "&:focus-visible": { outline: "3px solid rgba(255,255,255,0.85)", outlineOffset: 3 },
                  }}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-controls={drawerId}
                  aria-expanded={mobileOpen ? "true" : undefined}
                >
                  {mobileOpen ? <CloseIcon sx={{ fontSize: 32 }} /> : <MenuIcon sx={{ fontSize: 32 }} />}
                </IconButton>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          id: drawerId,
          role: "dialog",
          "aria-modal": true,
          "aria-labelledby": drawerTitleId,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
