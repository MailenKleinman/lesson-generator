import { Typography, Box, Paper, Stack, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

const faqs = [
  { q: 'How do I create a lesson?', a: 'Navigate to "Create new lesson" from the sidebar, fill in the lesson details, and click Generate.' },
  { q: 'Can I edit a generated lesson?', a: 'Yes. Open any lesson from "My lessons" and use the Edit button to modify its content.' },
  { q: 'How do I share a lesson with students?', a: 'Open the lesson and click the Share button to get a shareable link or export it as a PDF.' },
  { q: 'How do I reset my password?', a: 'Go to your Profile page and click "Change password", or use the Forgot password link on the login screen.' },
]

export default function Support() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Support
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Find answers to common questions or contact our support team.
      </Typography>

      <Typography variant="h6" gutterBottom>Frequently Asked Questions</Typography>
      <Box mb={4} maxWidth={560}>
        {faqs.map((faq) => (
          <Accordion key={faq.q} disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={500}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Typography variant="h6" gutterBottom>Contact Support</Typography>
      <Paper sx={{ p: 3, maxWidth: 560 }}>
        <Stack spacing={2}>
          <TextField label="Subject" fullWidth />
          <TextField label="Describe your issue" multiline rows={4} fullWidth />
          <Box>
            <Button variant="contained">Send Message</Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
