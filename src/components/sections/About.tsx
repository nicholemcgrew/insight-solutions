import { Box, Container, Typography, Paper, Stack } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import SecurityIcon from "@mui/icons-material/Security";
import InsightsIcon from "@mui/icons-material/Insights";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HikingIcon from "@mui/icons-material/Hiking";
import TableChartIcon from "@mui/icons-material/TableChart";

const HEADER_OFFSET_PX = 96;

const About = () => {
  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-heading"
      tabIndex={-1}
      sx={{
        bgcolor: "background.default",
        scrollMarginTop: `${HEADER_OFFSET_PX}px`,
        minHeight: `calc(100dvh - ${HEADER_OFFSET_PX}px)`,
        display: "flex",
        alignItems: "center",
        py: { xs: 4, sm: 5, md: 6 },
        position: "relative",
        overflow: "hidden",
      }}
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Full width container (no "md" clamp) */}
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          px: { xs: 2, sm: 3, md: 6, lg: 10 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 1100,
            mx: "auto",
          }}
        >
          {/* Decorative floating icons (hidden on xs so they won't collide) */}
          <Box
            aria-hidden="true"
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.14,
            }}
          >
            {/* Left cluster */}
            <Box
              sx={{
                position: "absolute",
                left: { md: -24, lg: -40 },
                top: 40,
                transform: "rotate(-18deg)",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.12))",
              }}
            >
              <CodeIcon sx={{ fontSize: 84, color: "primary.main" }} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: { md: 10, lg: 0 },
                top: 170,
                transform: "rotate(12deg)",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.12))",
              }}
            >
              <TableChartIcon sx={{ fontSize: 74, color: "secondary.main" }} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: { md: 70, lg: 60 },
                bottom: 40,
                transform: "rotate(-10deg)",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.12))",
              }}
            >
              <HikingIcon sx={{ fontSize: 82, color: "primary.main" }} />
            </Box>

            {/* Right cluster */}
            <Box
              sx={{
                position: "absolute",
                right: { md: -24, lg: -40 },
                top: 60,
                transform: "rotate(16deg)",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.12))",
              }}
            >
              <CameraAltIcon sx={{ fontSize: 80, color: "secondary.main" }} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: { md: 20, lg: 10 },
                top: 200,
                transform: "rotate(-14deg)",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.12))",
              }}
            >
              <InsightsIcon sx={{ fontSize: 78, color: "primary.main" }} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: { md: 70, lg: 60 },
                bottom: 50,
                transform: "rotate(10deg)",
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.12))",
              }}
            >
              <SecurityIcon sx={{ fontSize: 84, color: "primary.main" }} />
            </Box>
          </Box>

          {/* Content card */}
          <Paper
            elevation={0}
            sx={(t) => ({
              position: "relative",
              zIndex: 1,
              borderRadius: 4,
              bgcolor: "background.paper",
              border: `1px solid ${t.palette.divider}`,
              p: { xs: 3, sm: 4, md: 5 },
              overflow: "hidden",
            })}
          >
            <Stack spacing={{ xs: 1.5, md: 2 }}>
              <Typography
                id="about-heading"
                component="h2"
                sx={{
                  textAlign: "center",
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  lineHeight: 1.1,
                }}
                itemProp="name"
              >
                About Me
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: { xs: "1.05rem", sm: "1.12rem", md: "1.18rem" },
                  lineHeight: 1.75,
                  maxWidth: 860,
                  mx: "auto",
                }}
                itemProp="description"
              >
                I’m{" "}
                <Box component="span" itemProp="givenName" sx={{ color: "text.primary", fontWeight: 700 }}>
                  Nichole
                </Box>
                , founder of{" "}
                <Box
                  component="span"
                  itemProp="worksFor"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <Box component="span" itemProp="name" sx={{ color: "text.primary", fontWeight: 700 }}>
                    Insight Web Solutions
                  </Box>
                </Box>
                . I build modern, high-performing websites and I’m obsessive about accessibility (WCAG/508),
                SEO, UX, and clean, scalable code.
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: { xs: "1.02rem", sm: "1.08rem", md: "1.14rem" },
                  lineHeight: 1.7,
                  maxWidth: 860,
                  mx: "auto",
                }}
              >
                I also love data and systems thinking — and I’m expanding into{" "}
                <Box component="span" itemProp="knowsAbout" sx={{ color: "text.primary", fontWeight: 700 }}>
                  AWS + cybersecurity
                </Box>{" "}
                so I can help businesses build faster *and* safer.
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  mt: 1,
                  color: "text.secondary",
                  fontStyle: "italic",
                  fontSize: { xs: "0.98rem", sm: "1.02rem" },
                }}
                itemProp="jobTitle"
              >
                Founder & Lead Developer
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
