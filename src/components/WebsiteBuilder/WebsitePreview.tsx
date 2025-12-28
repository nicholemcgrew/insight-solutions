// src/components/WebsitePreview.tsx

import { Box, Typography, Card, CardContent } from "@mui/material"
import type { WebsiteConfig } from "../../types/WebsiteConfig"
/**
 * Props for the WebsitePreview component.
 */
interface WebsitePreviewProps {
  /**
   * Configuration used to render the preview/site.
   */
  config: WebsiteConfig
}

/**
 * A presentational component that renders a full-page
 * website preview based on the given WebsiteConfig.
 */
export default function WebsitePreview({ config }: WebsitePreviewProps) {
  const {
    businessName,
    tagline,
    about,
    services,
    colorScheme,
    heroImageUrl,
  } = config

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colorScheme.background,
        color: "#000",
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Hero section */}
      <Box
        sx={{
          backgroundColor: colorScheme.primary,
          color: "#fff",
          p: 4,
          textAlign: "center",
          backgroundImage: heroImageUrl ? `url(${heroImageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h3">
          {businessName || "Your Business Name"}
        </Typography>

        {tagline && (
          <Typography variant="h5" mt={1}>
            {tagline}
          </Typography>
        )}
      </Box>

      {/* About section */}
      <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{ color: colorScheme.primary }}
          mb={2}
        >
          About
        </Typography>
        <Typography variant="body1">
          {about || "Describe your business, your mission, and why customers should choose you."}
        </Typography>
      </Box>

      {/* Services section */}
      <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{ color: colorScheme.primary }}
          mb={2}
        >
          Services
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          gap={2}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              sx={{
                borderTop: `4px solid ${colorScheme.secondary}`,
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {service.title || "Service"}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {service.description ||
                    "Explain what this service includes and how it helps your customers."}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
