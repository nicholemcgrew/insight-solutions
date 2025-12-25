// src/sections/Hero.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { NAVBAR_HEIGHT } from "../components/Navbar";

type WordStyle = {
  text: string;
  color: string;
  doodle:
    | "stars"
    | "underline"
    | "highlight"
    | "arrow"
    | "zigzag"
    | "wavy"
    | "capsule"
    | "brackets"
    | "solidUnderline";
};

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const Hero = () => {
  const wordStyles: WordStyle[] = useMemo(
    () => [
      { text: "stunning", color: "#F59E0B", doodle: "stars" },
      { text: "accessible", color: "#34D399", doodle: "underline" },
      { text: "fast", color: "#60A5FA", doodle: "arrow" },
      { text: "data driven", color: "#A78BFA", doodle: "highlight" },
      { text: "high trust", color: "#FB7185", doodle: "wavy" },
    ],
    []
  );

  const [wordIndex, setWordIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // IMPORTANT 508 NOTE:
  // Only ONE "banner" landmark should exist on a page (typically your site header/nav).
  // So Hero is a SECTION (not banner). It is still focusable for skip/hash navigation.
  const sectionRef = useRef<HTMLElement | null>(null);

  const headingId = "hero-heading";
  const subheadId = "hero-subhead";

  // 508: If deep-linked to #home, move focus to this section (announces context)
  useEffect(() => {
    if (location.hash === "#home") {
      sectionRef.current?.focus({ preventScroll: true });
    }
  }, [location.hash]);

  // Respect reduced motion: no rotating words if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % wordStyles.length);
    }, 2200);

    return () => window.clearInterval(id);
  }, [wordStyles.length]);

  const current = wordStyles[wordIndex];

  // 508: stable, descriptive equivalent for screen readers (avoid announcing animated swaps)
  const srHeadlineSuffix = "stunning, accessible, fast, data driven, high trust websites";

  // SPA-friendly CTA navigation (keeps href for SEO + copy link; no hard reload)
  const handleCtaToContact = (e?: React.MouseEvent) => {
    e?.preventDefault();
    navigate("/?cta=true#contact");
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="home"
      aria-labelledby={headingId}
      aria-describedby={subheadId}
      tabIndex={-1}
      sx={(t) => ({
        bgcolor: "primary.main",
        color: "primary.contrastText",
        minHeight: "100dvh",
        position: "relative",
        overflow: "hidden",

        // Helps hash-jumps land below the fixed navbar (good for keyboard users too)
        scrollMarginTop: { xs: `${NAVBAR_HEIGHT.mobile}px`, lg: `${NAVBAR_HEIGHT.desktop}px` },

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `radial-gradient(900px 600px at 50% 15%, ${t.palette.secondary.main}33, transparent 60%)`,
          pointerEvents: "none",
        },

        "@keyframes wordIn": {
          "0%": { opacity: 0, transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        "@keyframes doodlePop": {
          "0%": { opacity: 0, transform: "scale(0.98)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "@keyframes doodleWiggle": {
          "0%": { transform: "translateX(-4px)" },
          "100%": { transform: "translateX(4px)" },
        },
      })}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: {
            xs: `calc(100dvh - ${NAVBAR_HEIGHT.mobile}px)`,
            lg: `calc(100dvh - ${NAVBAR_HEIGHT.desktop}px)`,
          },
          mt: { xs: `${NAVBAR_HEIGHT.mobile}px`, lg: `${NAVBAR_HEIGHT.desktop}px` },
          display: "flex",
          alignItems: "center",
          py: { xs: 4, sm: 5, md: 6 },
        }}
      >
        <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
            <Stack spacing={{ xs: 2.0, md: 2.4 }} alignItems="center">
              <Typography
                id={headingId}
                component="h1"
                itemProp="headline"
                sx={{
                  // Responsive + readable: prevent md “dead zone”
                  fontSize: {
                    xs: "clamp(2.05rem, 6.2vw, 2.7rem)",
                    sm: "clamp(2.45rem, 4.9vw, 3.25rem)",
                    md: "clamp(3.25rem, 3.7vw, 3.75rem)",
                    lg: "clamp(3.75rem, 3.2vw, 4.25rem)",
                  },
                  fontWeight: 900,
                  lineHeight: { xs: 1.12, sm: 1.08, md: 1.05 },
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  maxWidth: 980,
                  textWrap: "balance",
                }}
              >
                <Box component="span" sx={{ display: "block" }}>
                  Build your dream website
                </Box>

                <Box
                  component="span"
                  sx={{
                    display: "block",
                    position: "relative",
                    mt: { xs: 0.25, sm: 0.35 },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      maxWidth: "100%",
                      px: { xs: 0.25, sm: 0.35 },
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "100%",
                      }}
                    >
                      <Box
                        key={current.text}
                        component="span"
                        sx={{
                          position: "relative",
                          display: "inline-block",
                          width: "fit-content",
                          maxWidth: "100%",
                          px: { xs: 0.4, sm: 0.55 },
                          color: current.color,
                          fontWeight: 900,
                          animation: prefersReducedMotion() ? "none" : "wordIn 300ms ease-out",

                          // Critical for tiny screens + long phrases
                          whiteSpace: "normal",
                          wordBreak: "keep-all",
                        }}
                      >
                        {current.text}

                        {current.doodle === "stars" && (
                          <Box
                            component="svg"
                            sx={{
                              position: "absolute",
                              inset: { xs: -14, sm: -18 },
                              width: "140%",
                              height: "140%",
                              animation: prefersReducedMotion() ? "none" : "doodlePop 400ms ease-out",
                              pointerEvents: "none",
                            }}
                            viewBox="0 0 140 100"
                            aria-hidden="true"
                          >
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((rot, i) => (
                              <path
                                key={i}
                                d="M10 0 L13 7 L20 7 L15 11 L17 18 L10 14 L3 18 L5 11 L0 7 L7 7 Z"
                                fill={current.color}
                                transform={`translate(70,50) rotate(${rot}) translate(0,-35)`}
                                opacity={0.8}
                              />
                            ))}
                          </Box>
                        )}

                        {current.doodle === "solidUnderline" && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: -2,
                              right: -2,
                              bottom: { xs: -8, sm: -10 },
                              height: { xs: 5, sm: 6 },
                              borderRadius: 999,
                              background: current.color,
                              opacity: 0.9,
                              pointerEvents: "none",
                            }}
                          />
                        )}

                        {current.doodle === "underline" && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: -4,
                              right: -4,
                              bottom: { xs: -8, sm: -10 },
                              height: { xs: 7, sm: 8 },
                              borderRadius: 999,
                              background: `linear-gradient(90deg, transparent, ${current.color}, transparent)`,
                              opacity: 0.95,
                              pointerEvents: "none",
                            }}
                          />
                        )}

                        {current.doodle === "highlight" && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: -6,
                              right: -6,
                              top: "58%",
                              height: "0.75em",
                              transform: "translateY(-50%) skewX(-10deg)",
                              borderRadius: 10,
                              background: `${current.color}33`,
                              pointerEvents: "none",
                            }}
                          />
                        )}

                        {current.doodle === "arrow" && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: "50%",
                              bottom: { xs: -14, sm: -16 },
                              width: { xs: 54, sm: 70 },
                              height: 18,
                              transform: "translateX(-50%) rotate(-8deg)",
                              pointerEvents: "none",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: 0,
                                right: 14,
                                top: 8,
                                height: 3,
                                bgcolor: current.color,
                                borderRadius: 999,
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                right: 4,
                                top: 2,
                                width: 0,
                                height: 0,
                                borderTop: "7px solid transparent",
                                borderBottom: "7px solid transparent",
                                borderLeft: `10px solid ${current.color}`,
                              }}
                            />
                          </Box>
                        )}

                        {current.doodle === "zigzag" && (
                          <Box
                            component="svg"
                            sx={{
                              position: "absolute",
                              left: -6,
                              right: -6,
                              bottom: { xs: -16, sm: -18 },
                              width: "calc(100% + 12px)",
                              height: 26,
                              overflow: "visible",
                              pointerEvents: "none",
                              animation: prefersReducedMotion()
                                ? "none"
                                : "doodleWiggle 900ms ease-in-out alternate infinite",
                              opacity: 0.95,
                            }}
                            viewBox="0 0 100 30"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M0 16 L12 6 L25 26 L38 6 L50 26 L62 6 L75 26 L88 6 L100 16"
                              stroke={current.color}
                              strokeWidth="7"
                              strokeLinecap="round"
                              fill="none"
                            />
                          </Box>
                        )}

                        {current.doodle === "wavy" && (
                          <Box
                            component="svg"
                            sx={{
                              position: "absolute",
                              left: -6,
                              right: -6,
                              bottom: { xs: -16, sm: -18 },
                              width: "calc(100% + 12px)",
                              height: 26,
                              overflow: "visible",
                              pointerEvents: "none",
                              animation: prefersReducedMotion()
                                ? "none"
                                : "doodleWiggle 1000ms ease-in-out alternate infinite",
                              opacity: 0.95,
                            }}
                            viewBox="0 0 100 30"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M0 16 Q 12.5 6, 25 16 T 50 16 T 75 16 T 100 16"
                              stroke={current.color}
                              strokeWidth="7"
                              strokeLinecap="round"
                              fill="none"
                            />
                          </Box>
                        )}

                        {current.doodle === "capsule" && (
                          <Box
                            aria-hidden="true"
                            sx={{
                              position: "absolute",
                              left: { xs: -8, sm: -10 },
                              right: { xs: -8, sm: -10 },
                              top: "52%",
                              height: { xs: 32, sm: 40, md: 44 },
                              transform: "translateY(-50%) rotate(-3deg)",
                              border: "2px solid",
                              borderColor: current.color,
                              borderRadius: "999px",
                              opacity: 0.9,
                              pointerEvents: "none",
                            }}
                          />
                        )}

                        {current.doodle === "brackets" && (
                          <Box
                            aria-hidden="true"
                            sx={{
                              position: "absolute",
                              left: { xs: -8, sm: -10 },
                              right: { xs: -8, sm: -10 },
                              top: -6,
                              bottom: -12,
                              pointerEvents: "none",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: 12,
                                height: 12,
                                borderLeft: `3px solid ${current.color}`,
                                borderTop: `3px solid ${current.color}`,
                                borderRadius: 2,
                                opacity: 0.9,
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                right: 0,
                                bottom: 0,
                                width: 12,
                                height: 12,
                                borderRight: `3px solid ${current.color}`,
                                borderBottom: `3px solid ${current.color}`,
                                borderRadius: 2,
                                opacity: 0.9,
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Screen-reader friendly equivalent (stable) */}
                    <Box
                      component="span"
                      sx={{
                        position: "absolute",
                        width: 1,
                        height: 1,
                        p: 0,
                        m: -1,
                        overflow: "hidden",
                        clip: "rect(0,0,0,0)",
                        whiteSpace: "nowrap",
                        border: 0,
                      }}
                    >
                      {srHeadlineSuffix}
                    </Box>
                  </Box>
                </Box>
              </Typography>

              <Typography
                id={subheadId}
                component="p"
                sx={{
                  fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.3rem", lg: "1.35rem" },
                  lineHeight: 1.65,
                  maxWidth: 920,
                  opacity: 0.95,
                  textAlign: "center",
                }}
              >
                We specialize in 508-compliant web development, high-SEO strategies, custom dashboards, and
                comprehensive analytics to drive your business forward.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mt: { xs: 2.5, md: 3 } }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={NavLink}
                  to="/pricing"
                  sx={{
                    px: 4,
                    py: 1.4,
                    fontSize: { xs: "1rem", md: "1.06rem" },
                  }}
                >
                  View Pricing
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href="/?cta=true#contact"
                  onClick={handleCtaToContact}
                  sx={{
                    px: 4,
                    py: 1.4,
                    fontSize: { xs: "1rem", md: "1.06rem" },
                    borderWidth: 2,
                    borderColor: "white",
                    color: "white",
                    "&:hover": { borderWidth: 2, bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Get Free Consultation
                </Button>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
