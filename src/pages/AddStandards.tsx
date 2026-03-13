import { Typography, Box, Paper, Stack, TextField, MenuItem, Button, Chip } from '@mui/material'
import { useState } from 'react'

const frameworks = ['Common Core', 'Next Generation Science Standards', 'TEKS', 'Virginia SOL', 'Custom']

export default function AddStandards() {
  const [tags, setTags] = useState<string[]>(['CCSS.Math.Content.5.NBT'])

  const handleAdd = () => {
    setTags((t) => [...t, `Standard-${t.length + 1}`])
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Add Standards
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Define and manage curriculum standards aligned to your lessons.
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={3}>
          <TextField label="Standards Framework" select fullWidth defaultValue="">
            {frameworks.map((f) => (
              <MenuItem key={f} value={f}>{f}</MenuItem>
            ))}
          </TextField>
          <TextField label="Standard Code" fullWidth placeholder="e.g. CCSS.ELA-Literacy.RI.5.1" />
          <TextField label="Description" multiline rows={3} fullWidth placeholder="Describe what students should know or be able to do." />
          <Box>
            <Typography variant="body2" gutterBottom>Applied tags</Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={() => setTags((t) => t.filter((x) => x !== tag))}
                />
              ))}
            </Box>
            <Button size="small" onClick={handleAdd}>+ Add tag</Button>
          </Box>
          <Box>
            <Button variant="contained">Save Standard</Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
