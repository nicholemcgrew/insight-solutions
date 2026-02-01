
import {  Container, Typography, Link as MuiLink } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight={800}>
        Privacy Policy
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Last updated: February 1, 2026
      </Typography>

      <Typography variant="body1" paragraph sx={{ mt: 4 }}>
        Insight Web Solutions ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (https://insightwebsolutions.com or any subdomain), use our services, or contact us.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        1. Information We Collect
      </Typography>
      <Typography variant="body1" paragraph>
        We may collect:
      </Typography>
      <ul>
        <li>
          <strong>Personal Information</strong> you voluntarily provide (name, email address, phone number, message content) when you submit a contact form, request a quote, or communicate with us.
        </li>
        <li>
          <strong>Automatically Collected Data</strong> such as IP address, browser type, device information, pages visited, time spent on pages, and referring URLs (via cookies, analytics tools like Google Analytics, or server logs).
        </li>
      </ul>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        2. How We Use Your Information
      </Typography>
      <Typography variant="body1" paragraph>
        We use your information to:
      </Typography>
      <ul>
        <li>Respond to your inquiries, send quotes, or provide services</li>
        <li>Improve our website and services</li>
        <li>Analyze site usage and performance (anonymized)</li>
        <li>Comply with legal obligations</li>
      </ul>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        3. Sharing Your Information
      </Typography>
      <Typography variant="body1" paragraph>
        We do not sell your personal information. We may share it only:
      </Typography>
      <ul>
        <li>With service providers (hosting, email, analytics) who are bound to protect it</li>
        <li>If required by law, subpoena, or government request</li>
        <li>To protect our rights, safety, or property</li>
      </ul>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        4. Cookies & Tracking Technologies
      </Typography>
      <Typography variant="body1" paragraph>
        We use cookies and similar technologies for functionality and analytics. You can manage preferences via your browser settings. We currently use Google Analytics (anonymized IP). For more details, see Google's privacy policy.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        5. Your Rights
      </Typography>
      <Typography variant="body1" paragraph>
        Depending on your location, you may have rights to access, correct, delete, or opt out of certain uses of your data. Contact us at hello@insightwebsolutions.com to exercise these rights.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        6. Security
      </Typography>
      <Typography variant="body1" paragraph>
        We use reasonable administrative, technical, and physical safeguards to protect your information. However, no method of transmission over the internet is 100% secure.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        7. Children's Privacy
      </Typography>
      <Typography variant="body1" paragraph>
        Our services are not directed to children under 13. We do not knowingly collect data from children under 13.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        8. Changes to This Policy
      </Typography>
      <Typography variant="body1" paragraph>
        We may update this policy from time to time. Changes will be posted here with an updated "Last updated" date.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        9. Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Questions about this Privacy Policy? Reach out at:
      </Typography>
      <Typography variant="body1" paragraph>
        Email:{" "}
        <MuiLink href="mailto:hello@insightwebsolutions.com">
          hello@insightwebsolutions.com
        </MuiLink>
      </Typography>

      <Typography variant="body2" color="text.secondary" mt={8}>
        Insight Web Solutions • Oklahoma City, OK • © {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;