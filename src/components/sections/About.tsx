// src/components/sections/About.tsx

import { Box, Container, Typography, Paper, Stack } from "@mui/material";

const HEADER_OFFSET_PX = 96;

// Generate random positions for icons
const generatePositions = () => {
  return Array.from({ length: 12 }, () => ({
    left: Math.random() * 80 + 10 + "%",
    top: Math.random() * 80 + 10 + "%",
    rotation: Math.random() * 360,
    scale: Math.random() * 0.3 + 0.8,
    delay: Math.random() * 5 + "s",
  }));
};

const About = () => {
  const positions = generatePositions();

  const iconStyle = (pos: any) => ({
    position: "absolute" as const,
    left: pos.left,
    top: pos.top,
    transform: `translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${pos.scale})`,
    width: { xs: 60, sm: 80, md: 100 },
    transition: "transform 0.6s ease",
    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
    animation: `float 20s ease-in-out infinite ${pos.delay}`,
    "&:hover": {
      transform: `translate(-50%, -50%) rotate(${pos.rotation + 180}deg) scale(${pos.scale * 1.4})`,
    },
  });

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
        py: { xs: 8, sm: 10, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Floating Tech Icons */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {/* React */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" sx={iconStyle(positions[0])} />

        {/* TypeScript */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" sx={{ ...iconStyle(positions[1]), width: { xs: 60, sm: 80, md: 100 } }} />

        {/* Node.js */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" sx={{ ...iconStyle(positions[2]), width: { xs: 70, sm: 90, md: 110 } }} />

        {/* Java */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" sx={{ ...iconStyle(positions[3]), width: { xs: 65, sm: 85, md: 105 } }} />

        {/* MySQL */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" sx={{ ...iconStyle(positions[4]), width: { xs: 60, sm: 80, md: 100 } }} />

        {/* AWS */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" sx={{ ...iconStyle(positions[5]), width: { xs: 80, sm: 100, md: 120 } }} />

        {/* Git */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" sx={{ ...iconStyle(positions[6]), width: { xs: 60, sm: 80, md: 100 } }} />

        {/* Material UI */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg" alt="Material UI" sx={{ ...iconStyle(positions[7]), width: { xs: 60, sm: 80, md: 100 } }} />

        {/* JavaScript */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" sx={{ ...iconStyle(positions[8]), width: { xs: 60, sm: 80, md: 100 } }} />

        {/* HTML5 */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML5" sx={{ ...iconStyle(positions[9]), width: { xs: 60, sm: 80, md: 100 } }} />

        {/* CSS3 */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" sx={{ ...iconStyle(positions[10]), width: { xs: 60, sm: 80, md: 100 } }} />

        {/* MongoDB */}
        <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" sx={{ ...iconStyle(positions[11]), width: { xs: 70, sm: 90, md: 110 } }} />
      </Box>

      {/* Main Content Card */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 30 }}>
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
             
              border: (theme) => `1px solid ${theme.palette.divider}`,
              p: { xs: 4, sm: 6, md: 8 },
              backdropFilter: "blur(12px)",
            }}
          >
            <Stack spacing={{ xs: 3, md: 4 }}>
              <Typography
                id="about-heading"
                component="h2"
                sx={{
                  textAlign: "center",
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  fontSize: { xs: "2.4rem", sm: "2.8rem", md: "3.2rem" },
                  lineHeight: 1.15,
                }}
                itemProp="name"
              >
                Hi, I’m Nichole — Founder of Insight Web Solutions
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: { xs: "1.12rem", sm: "1.2rem", md: "1.3rem" },
                  lineHeight: 1.8,
                  maxWidth: 800,
                  mx: "auto",
                }}
                itemProp="description"
              >
                I partner with growing businesses, agencies, and enterprises to build high-performance, accessible digital experiences that drive measurable results — higher conversions, better search rankings, inclusive usability, and long-term scalability.
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: { xs: "1.08rem", sm: "1.15rem", md: "1.22rem" },
                  lineHeight: 1.8,
                  maxWidth: 800,
                  mx: "auto",
                }}
              >
                Specializing in WCAG-compliant web development, technical SEO optimization, conversion-focused UX, data analytics & automation, and secure cloud solutions — I deliver clean, modern code and strategic insights that help ambitious organizations stand out in competitive markets.
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: { xs: "1.08rem", sm: "1.15rem", md: "1.22rem" },
                  lineHeight: 1.8,
                  maxWidth: 800,
                  mx: "auto",
                  fontWeight: 600,
                }}
              >
                Whether you're scaling a SaaS platform, enhancing enterprise accessibility compliance, or optimizing data-driven decision making — let’s create something exceptional together.
              </Typography>

              <Typography
                component="p"
                sx={{
                  textAlign: "center",
                  mt: 3,
                  color: "text.secondary",
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                }}
                itemProp="jobTitle"
              >
                Founder & Lead Developer
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>

      {/* Floating Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(15px); }
        }
      `}</style>
    </Box>
  );
};

export default About;