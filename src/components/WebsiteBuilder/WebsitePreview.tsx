// src/components/WebsiteBuilder/WebsitePreview.tsx

import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Link,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";
import type { WebsiteConfig } from "../../types/WebsiteConfig";

interface WebsitePreviewProps {
  config: WebsiteConfig;
}

export default function WebsitePreview({ config }: WebsitePreviewProps) {
  const {
    businessName = "Your Business",
    tagline,
    about,
    services = [],
    contactEmail,
    phone,
    address,
    heroImage,
    colorScheme = {
      primary: "#1976d2",
      secondary: "#9c27b0",
      background: "#ffffff",
      text: "#000000",
    },
    facebook,
    instagram,
    linkedin,
  } = config;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colorScheme.background, color: colorScheme.text }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: colorScheme.primary }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {businessName}
          </Typography>
          <Button color="inherit" href="#about">About</Button>
          <Button color="inherit" href="#services">Services</Button>
          <Button color="inherit" href="#contact">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box
        sx={{
          height: "80vh",
          minHeight: 500,
          bgcolor: colorScheme.primary,
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          backgroundImage: heroImage ? `url(${heroImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": heroImage
            ? { content: '""', position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.5)" }
            : {},
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 800, px: 3 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            {businessName}
          </Typography>
          {tagline && <Typography variant="h4">{tagline}</Typography>}
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4, bgcolor: colorScheme.secondary }}
            href="#contact"
          >
            Get in Touch
          </Button>
        </Box>
      </Box>

      {/* About */}
      <Container id="about" sx={{ py: 10 }}>
        <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: colorScheme.primary }}>
          About Us
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" maxWidth={800} mx="auto">
          {about || "Tell your story and build trust with your visitors."}
        </Typography>
      </Container>

      {/* Services */}
      <Box id="services" sx={{ bgcolor: "grey.50", py: 10 }}>
        <Container>
          <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: colorScheme.primary }}>
            Our Services
          </Typography>
          <Grid container spacing={4} mt={2}>
            {services.length > 0 ? (
              services.map((service, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: "100%", "&:hover": { boxShadow: 6 } }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ color: colorScheme.primary }}>
                        {service.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography textAlign="center" color="text.secondary" width="100%">
                No services added yet.
              </Typography>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Contact */}
      <Container id="contact" sx={{ py: 10 }}>
        <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: colorScheme.primary }}>
          Contact
        </Typography>
        <Grid container spacing={3} justifyContent="center" mt={3}>
          {contactEmail && (
            <Grid item>
              <Button startIcon={<Email />} href={`mailto:${contactEmail}`}>
                {contactEmail}
              </Button>
            </Grid>
          )}
          {phone && (
            <Grid item>
              <Button startIcon={<Phone />} href={`tel:${phone}`}>
                {phone}
              </Button>
            </Grid>
          )}
          {address && (
            <Grid item>
              <Button startIcon={<LocationOn />}>{address}</Button>
            </Grid>
          )}
        </Grid>

        {(facebook || instagram || linkedin) && (
          <Box textAlign="center" mt={5}>
            {facebook && <IconButton component={Link} href={facebook} target="_blank"><Facebook /></IconButton>}
            {instagram && <IconButton component={Link} href={instagram} target="_blank"><Instagram /></IconButton>}
            {linkedin && <IconButton component={Link} href={linkedin} target="_blank"><LinkedIn /></IconButton>}
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: colorScheme.primary, color: "white", py: 4, textAlign: "center" }}>
        <Typography>© {new Date().getFullYear()} {businessName}. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}