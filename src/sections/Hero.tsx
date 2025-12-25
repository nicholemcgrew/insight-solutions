import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const HEADER_OFFSET_PX = 96;

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

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % wordStyles.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [wordStyles.length]);

  const current = wordStyles[wordIndex];

  return (
    <Box
      component="header"
      id="home"
      role="banner"
      aria-labelledby="hero-heading"
      tabIndex={-1}
      sx={(t) => ({
        bgcolor: "primary.main",
        color: "primary.contrastText",
        minHeight: "100dvh",
        pt: `${HEADER_OFFSET_PX}px`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",

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
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
          <Stack spacing={{ xs: 2, md: 2.5 }} alignItems="center">
            <Typography
              id="hero-heading"
              component="h1"
              itemProp="headline"
              sx={{
                fontSize: {
                  xs: "2.2rem",
                  sm: "3rem",
                  md: "3.7rem",
                  lg: "4.1rem",
                },
                fontWeight: 900,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              <Box component="span" sx={{ display: "block", whiteSpace: "nowrap" }}>
                Build your dream website
              </Box>

              <Box
                component="span"
                sx={{
                  display: "block",
                  position: "relative",
                  height: "1.2em",
                  mt: 0.15,
                }}
              >
                {/* SLOT: fixed width so no layout shift */}
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    width: { xs: "12ch", sm: "14ch", md: "16ch" },
                    height: "1.15em",
                    overflow: "visible",
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {/* WORD: shrink-wraps to content so doodles only cover the word */}
                    <Box
                      key={current.text}
                      component="span"
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        width: "fit-content",
                        px: { xs: 0.4, sm: 0.55 },
                        color: current.color,
                        fontWeight: 900,
                        animation: "wordIn 300ms ease-out",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {current.text}

                      {/* Stars */}
                      {current.doodle === "stars" && (
                        <Box
                          component="svg"
                          sx={{
                            position: "absolute",
                            inset: -18,
                            width: "140%",
                            height: "140%",
                            animation: "doodlePop 400ms ease-out",
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

                      {/* Solid underline */}
                      {current.doodle === "solidUnderline" && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: -2,
                            right: -2,
                            bottom: -10,
                            height: 6,
                            borderRadius: 999,
                            background: current.color,
                            opacity: 0.9,
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {/* Gradient underline */}
                      {current.doodle === "underline" && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: -4,
                            right: -4,
                            bottom: -10,
                            height: 8,
                            borderRadius: 999,
                            background: `linear-gradient(90deg, transparent, ${current.color}, transparent)`,
                            opacity: 0.95,
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {/* Highlight */}
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

                      {/* Arrow */}
                      {current.doodle === "arrow" && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: "50%",
                            bottom: -16,
                            width: 70,
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

                      {/* Zigzag - word width */}
                      {current.doodle === "zigzag" && (
                        <Box
                          component="svg"
                          sx={{
                            position: "absolute",
                            left: -6,
                            right: -6,
                            bottom: -18,
                            width: "calc(100% + 12px)",
                            height: 26,
                            overflow: "visible",
                            pointerEvents: "none",
                            animation: "doodleWiggle 900ms ease-in-out alternate infinite",
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

                      {/* Wavy - word width */}
                      {current.doodle === "wavy" && (
                        <Box
                          component="svg"
                          sx={{
                            position: "absolute",
                            left: -6,
                            right: -6,
                            bottom: -18,
                            width: "calc(100% + 12px)",
                            height: 26,
                            overflow: "visible",
                            pointerEvents: "none",
                            animation: "doodleWiggle 1000ms ease-in-out alternate infinite",
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

                      {/* Capsule outline - word width */}
                      {current.doodle === "capsule" && (
                        <Box
                          aria-hidden="true"
                          sx={{
                            position: "absolute",
                            left: -10,
                            right: -10,
                            top: "52%",
                            height: { xs: 34, sm: 40, md: 44 },
                            transform: "translateY(-50%) rotate(-3deg)",
                            border: "2px solid",
                            borderColor: current.color,
                            borderRadius: "999px",
                            opacity: 0.9,
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {/* Brackets - word width */}
                      {current.doodle === "brackets" && (
                        <Box
                          aria-hidden="true"
                          sx={{
                            position: "absolute",
                            left: -10,
                            right: -10,
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

                  {/* Screen-reader-friendly static description */}
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
                    stunning, accessible, fast, data driven, high trust websites
                  </Box>
                </Box>
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1.05rem", sm: "1.18rem", md: "1.28rem" },
                lineHeight: 1.65,
                maxWidth: 920,
                opacity: 0.95,
              }}
            >
              We specialize in 508-compliant web development, high-SEO strategies, custom dashboards, and comprehensive
              analytics to drive your business forward.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
                mt: { xs: 3, md: 4 },
              }}
            >
              <Button variant="contained" color="secondary" size="large" component={NavLink} to="/pricing" sx={{ px: 4, py: 1.5 }}>
                View Pricing
              </Button>

              <Button
                variant="outlined"
                size="large"
                component="a"
                href="/?cta=true#contact"
                sx={{
                  px: 4,
                  py: 1.5,
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
  );
};

export default Hero;
