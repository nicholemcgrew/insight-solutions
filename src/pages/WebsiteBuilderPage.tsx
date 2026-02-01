// // src/pages/WebsiteBuilderPage.tsx

// import { useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import WebsiteForm from "../components/WebsiteBuilder/WebsiteForm";
// import WebsitePreview from "../components/WebsiteBuilder/WebsitePreview";
// import type { WebsiteConfig } from "../types/WebsiteConfig";

// export default function WebsiteBuilderPage() {
//   const [config, setConfig] = useState<WebsiteConfig>({
//     businessName: "Insight Studio",
//     tagline: "Creative Digital Solutions",
//     about: "We craft beautiful, modern websites that help your business grow and stand out.",
//     contactEmail: "hello@insight.studio",
//     phone: "+1 (555) 123-4567",
//     colorScheme: {
//       primary: "#3b82f6",
//       secondary: "#8b5cf6",
//       background: "#ffffff",
//       text: "#1e293b",
//     },
//     services: [
//       { title: "Web Design", description: "Stunning, responsive websites tailored to your brand." },
//       { title: "Branding", description: "Logos, identity, and full brand strategy." },
//       { title: "Development", description: "Fast, secure, and scalable web applications." },
//     ],
//   });

//   const handleSubmit = (data: WebsiteConfig) => {
//     console.log("Final website config:", data);
//     alert("Website successfully generated! Ready for deployment.");
//     // Add backend save / static export here later
//   };

//   return (
//     <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} minHeight="100vh" bgcolor="#f5f5f5">
//       {/* Left: Form */}
//       <Box flex={1} p={4} overflow="auto">
//         <WebsiteForm onChange={setConfig} initialValues={config} onSubmit={handleSubmit} />
//       </Box>

//       {/* Right: Live Previews */}
//       <Box flex={1} p={4} display="flex" flexDirection="column" gap={6}>
//         {/* Desktop Preview */}
//         <Box>
//           <Typography variant="h6" gutterBottom fontWeight="bold">
//             Desktop Preview
//           </Typography>
//           <Paper elevation={12} sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 8 }}>
//             <Box sx={{ height: { xs: 500, md: 700 }, overflow: "auto" }}>
//               <WebsitePreview config={config} />
//             </Box>
//           </Paper>
//         </Box>

//         {/* Mobile Preview - Realistic iPhone Frame */}
//         <Box>
//           <Typography variant="h6" gutterBottom fontWeight="bold">
//             Mobile Preview
//           </Typography>
//           <Box
//             sx={{
//               width: 390,
//               height: 844,
//               mx: "auto",
//               bgcolor: "#000",
//               borderRadius: "60px",
//               padding: "20px 12px",
//               boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
//               position: "relative",
//               "&::before": {
//                 content: '""',
//                 position: "absolute",
//                 top: 12,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 width: 160,
//                 height: 30,
//                 bgcolor: "#000",
//                 borderRadius: "20px",
//               },
//             }}
//           >
//             <Box
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 bgcolor: "#fff",
//                 borderRadius: "50px",
//                 overflow: "hidden",
//                 boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
//               }}
//             >
//               <Box sx={{ transform: "scale(0.96)", transformOrigin: "top center", height: "100%" }}>
//                 <WebsitePreview config={config} />
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }