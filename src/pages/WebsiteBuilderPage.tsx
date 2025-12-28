// src/pages/WebsiteBuilderPage.tsx

import { useState } from "react"
import { Box, Typography } from "@mui/material"
import WebsiteForm from "@components/WebsiteBuilder/WebsiteForm"
import WebsitePreview from "@components/WebsiteBuilder/WebsitePreview"
import type { WebsiteConfig } from "../types/WebsiteConfig"

/**
 * A page that combines the WebsiteForm and WebsitePreview.
 * 
 * - The form updates local state on submit.
 * - The preview renders from that state.
 * - You can later plug in a backend call inside handleSubmit.
 */
export default function WebsiteBuilderPage() {
  const [config, setConfig] = useState<WebsiteConfig | null>(null)

  /**
   * Handler called when the WebsiteForm is submitted.
   * 
   * This is where you can:
   * - Save to a backend API
   * - Navigate to a public site route
   * - Trigger analytics events
   */
  function handleSubmit(data: WebsiteConfig) {
    setConfig(data)
    // Example placeholder:
    // await api.post("/sites", data)
    // navigate(`/sites/${response.data.id}`)
  }

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
      {/* Left side: configuration form */}
      <Box flex={1} p={2}>
        <Typography variant="h4" mb={3}>
          Website builder
        </Typography>
        <WebsiteForm onSubmit={handleSubmit} />
      </Box>

      {/* Right side: live preview */}
      <Box
        flex={1}
        p={2}
        sx={{
          borderLeft: { md: 1 },
          borderColor: { md: "divider" },
          minHeight: { md: "100vh" },
        }}
      >
        {config ? (
          <WebsitePreview config={config} />
        ) : (
          <Typography variant="body1" color="text.secondary">
            Fill out the form to see a live preview of your website here.
          </Typography>
        )}
      </Box>
    </Box>
  )
}
