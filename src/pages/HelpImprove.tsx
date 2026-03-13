import { Typography, Box, Paper, Stack, TextField, Button, Rating } from '@mui/material'
import { useState } from 'react'

export default function HelpImprove() {
  const [rating, setRating] = useState<number | null>(null)

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Help us improve
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Share your feedback to help us build a better experience.
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 560 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" gutterBottom>
              How would you rate your overall experience?
            </Typography>
            <Rating
              value={rating}
              onChange={(_, v) => setRating(v)}
              size="large"
            />
          </Box>
          <TextField
            label="What's working well?"
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="What could be improved?"
            multiline
            rows={3}
            fullWidth
          />
          <Box>
            <Button variant="contained">Submit Feedback</Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
