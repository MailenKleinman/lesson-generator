import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Stack,
} from '@mui/material'

const subjects = ['Math', 'Science', 'History', 'English', 'Computer Science', 'Art']

export default function CreateLesson() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Create New Tool
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Fill in the details below to generate a new tool.
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={3}>
          <TextField label="Tool Title" fullWidth />
          <TextField label="Subject" select fullWidth defaultValue="">
            {subjects.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
          <TextField label="Grade Level" fullWidth placeholder="e.g. Grade 5" />
          <TextField
            label="Learning Objectives"
            fullWidth
            multiline
            rows={3}
            placeholder="What should students learn from this tool?"
          />
          <Box display="flex" gap={2}>
            <Button variant="contained" size="large">Generate Tool</Button>
            <Button variant="outlined" size="large">Save Draft</Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
