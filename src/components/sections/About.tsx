import { Box, Container, Typography, Paper, Stack } from "@mui/material";

const HEADER_OFFSET_PX = 96;

const About = () => {
  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-heading"
      tabIndex={-1}
      sx={(t) => ({
        bgcolor: "background.default",
        scrollMarginTop: `${HEADER_OFFSET_PX}px`,
        minHeight: `calc(100dvh - ${HEADER_OFFSET_PX}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, sm: 7, md: 8 },
        position: "relative",
        overflow: "hidden",
        backgroundImage: `
          radial-gradient(900px 420px at 50% 0%, ${t.palette.action.hover} 0%, transparent 60%),
          radial-gradient(700px 320px at 10% 90%, ${t.palette.action.hover} 0%, transparent 55%),
          radial-gradient(700px 320px at 90% 90%, ${t.palette.action.hover} 0%, transparent 55%)
        `,
      })}
      itemScope
      itemType="https://schema.org/Person"
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 30 }}>
        <Box sx={{ maxWidth: 920, mx: "auto" }}>
          <Paper
            elevation={0}
            sx={(t) => ({
              borderRadius: 4,
              bgcolor:
                t.palette.mode === "dark"
                  ? "rgba(18,18,18,0.72)"
                  : "rgba(255,255,255,0.78)",
              border: `1px solid ${t.palette.divider}`,
              boxShadow:
                t.palette.mode === "dark"
                  ? `0 18px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.35), 0 10px 28px ${t.palette.secondary.main}33`
                  : `0 18px 50px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06), 0 10px 28px ${t.palette.secondary.main}33`,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              p: { xs: 4, sm: 6, md: 7 },
            })}
          >
            <Stack spacing={{ xs: 2.5, md: 3 }}>
              <Typography
                id="about-heading"
                component="h2"
                sx={{
                  textAlign: "center",
                  fontWeight: 900,
                  letterSpacing: 0.2,
                  fontSize: { xs: "2.15rem", sm: "2.6rem", md: "3rem" },
                  lineHeight: 1.12,
                }}
                itemProp="name"
              >
                Hi, I’m Nichole, Founder of Insight Web Solutions
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: { xs: "1.1rem", sm: "1.18rem", md: "1.25rem" },
                  lineHeight: 1.8,
                  maxWidth: 820,
                  mx: "auto",
                }}
                itemProp="description"
              >
                I build high-performance, accessible websites and help teams
                make smarter decisions with clean, reliable data.
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: { xs: "1.05rem", sm: "1.12rem", md: "1.18rem" },
                  lineHeight: 1.8,
                  maxWidth: 820,
                  mx: "auto",
                }}
              >
                My work blends three core capabilities: WCAG compliant, SEO
                optimized web development; data and financial analytics; and
                system level problem solving. I’m driven by quality and
                curiosity, and I love untangling complex solutions. The result is
                high performing digital experiences and data systems that are
                inclusive by design and backed by insights you can trust.
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: { xs: "1.05rem", sm: "1.12rem", md: "1.18rem" },
                  lineHeight: 1.8,
                  maxWidth: 820,
                  mx: "auto",
                  fontWeight: 700,
                }}
              >
                Whether you need a polished website, stronger search visibility,
                or better reporting and data flow, I will help you ship outcomes
                that are measurable and maintainable.
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  mt: 2,
                  color: "text.secondary",
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                }}
                itemProp="jobTitle"
              >
                Founder and Lead Developer
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
