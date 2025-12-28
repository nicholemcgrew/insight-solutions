// src/pages/WebsiteBuilderPage.tsx

import { useState } from "react";
import { Box, AppBar, Tabs, Tab, Paper } from "@mui/material";
import WebsiteForm from "../components/WebsiteBuilder/WebsiteForm";
import WebsitePreview from "../components/WebsiteBuilder/WebsitePreview";
import type { WebsiteConfig } from "../types/WebsiteConfig";

export default function WebsiteBuilderPage() {
  const [config, setConfig] = useState<WebsiteConfig>({
    businessName: "Insight Studio",
    tagline: "Creative Digital Solutions",
    about: "We help businesses grow with beautiful, modern websites.",
    contactEmail: "hello@insight.studio",
    colorScheme: {
      primary: "#2563eb",
      secondary: "#7c3aed",
      background: "#f8fafc",
      text: "#0f172a",
    },
    services: [
      { title: "Web Design", description: "Custom responsive websites." },
      { title: "Branding", description: "Logo and brand identity." },
    ],
  });

  const [tab, setTab] = useState(0);

  return (
    <Box>
      <AppBar position="sticky" color="default">
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Edit" />
          <Tab label="Preview" />
        </Tabs>
      </AppBar>

      <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} height="calc(100vh - 64px)">
        <Box
          flex={1}
          p={4}
          overflow="auto"
          bgcolor="grey.50"
          display={tab === 0 ? "block" : "none"}
        >
          <WebsiteForm onChange={setConfig} initialValues={config} />
        </Box>

        <Box
          flex={1}
          p={3}
          overflow="auto"
          display={tab === 1 ? "block" : "none"}
          sx={{ borderLeft: { lg: "1px solid" }, borderColor: "divider" }}
        >
          <Paper elevation={6} sx={{ borderRadius: 4, overflow: "hidden", height: "100%" }}>
            <WebsitePreview config={config} />
          </Paper>
        </Box>

        {/* Mobile preview when editing */}
        {tab === 0 && (
          <Box
            position="fixed"
            bottom={16}
            right={16}
            width={360}
            height={640}
            bgcolor="black"
            borderRadius={12}
            boxShadow={24}
            display={{ xs: "none", lg: "block" }}
            p={1}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "white",
                borderRadius: 10,
                overflow: "hidden",
                border: "8px solid #111",
              }}
            >
              <Box sx={{ transform: "scale(0.85)", transformOrigin: "top left", width: "118%", height: "118%" }}>
                <WebsitePreview config={config} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}