import { Box, Container, Typography, Link as MuiLink } from "@mui/material";

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight={800}>
        Terms of Service
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Last updated: February 1, 2026
      </Typography>

      <Typography variant="body1" paragraph sx={{ mt: 4 }}>
        Welcome to Insight Web Solutions. These Terms of Service ("Terms") govern your use of our website and the purchase of our services (web development, SEO, accessibility audits, data/analytics work, etc.). By using our site or engaging our services, you agree to these Terms.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        1. Services
      </Typography>
      <Typography variant="body1" paragraph>
        We provide custom web development, accessibility consulting, SEO optimization, UX improvements, data analytics, SQL/ETL work, and related services as agreed in a proposal, quote, or contract.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        2. Payment & Deposits
      </Typography>
      <Typography variant="body1" paragraph>
        A non-refundable deposit (typically 30–50%) is required before work begins. Remaining balance is due upon project completion or on agreed milestones. Late payments may incur fees. All fees are in USD.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        3. Revisions & Scope
      </Typography>
      <Typography variant="body1" paragraph>
        Included revisions are specified in the quote/proposal (usually 1–2 rounds). Additional revisions or scope changes are billed at our hourly rate or as a new quote.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        4. Intellectual Property
      </Typography>
      <Typography variant="body1" paragraph>
        Upon full payment, you receive ownership of the final deliverables (website code, designs, reports, etc.), except for third-party libraries, frameworks, or stock assets (licensed appropriately). We retain the right to showcase the work in our portfolio unless otherwise agreed.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        5. Client Responsibilities
      </Typography>
      <Typography variant="body1" paragraph>
        You agree to provide necessary content, access credentials, feedback, and approvals in a timely manner. Delays caused by you may affect timelines and incur additional fees.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        6. Limitation of Liability
      </Typography>
      <Typography variant="body1" paragraph>
        We are not liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid for the specific project. We do not guarantee specific search rankings, traffic increases, or business results.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        7. Termination
      </Typography>
      <Typography variant="body1" paragraph>
        Either party may terminate a project with written notice. You remain responsible for payment of work completed up to termination. Deposits are non-refundable.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        8. Governing Law
      </Typography>
      <Typography variant="body1" paragraph>
        These Terms are governed by the laws of the State of Oklahoma, United States.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        9. Changes to Terms
      </Typography>
      <Typography variant="body1" paragraph>
        We may update these Terms. Continued use of our services after changes constitutes acceptance.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom mt={5}>
        10. Contact
      </Typography>
      <Typography variant="body1" paragraph>
        Questions? Reach us at:
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

export default TermsOfService;