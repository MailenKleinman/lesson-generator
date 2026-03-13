import {
  Typography,
  Box,
  Paper,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material'
import { Download, Upload, DeleteOutline } from '@mui/icons-material'

const exports = [
  { label: 'All lessons', size: '2.4 MB', date: 'Mar 8, 2026' },
  { label: 'Standards library', size: '512 KB', date: 'Mar 1, 2026' },
  { label: 'User activity log', size: '1.1 MB', date: 'Feb 22, 2026' },
]

export default function DataManagement() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Data Management
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Export, import, or delete application data.
      </Typography>

      <Stack spacing={3} maxWidth={600}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>Export Data</Typography>
          <List disablePadding>
            {exports.map((item, i) => (
              <ListItem key={item.label} divider={i < exports.length - 1} disableGutters>
                <ListItemText
                  primary={item.label}
                  secondary={`${item.size} · Last exported ${item.date}`}
                />
                <ListItemSecondaryAction>
                  <Button startIcon={<Download />} size="small">Export</Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>Import Data</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Upload a previously exported file to restore or merge data.
          </Typography>
          <Button variant="outlined" startIcon={<Upload />}>Choose File</Button>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} color="error" gutterBottom>Danger Zone</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Box>
              <Typography variant="body2" fontWeight={500}>Delete all lessons</Typography>
              <Typography variant="caption" color="text.secondary">This action cannot be undone.</Typography>
            </Box>
            <Button variant="outlined" color="error" startIcon={<DeleteOutline />} size="small">
              Delete
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Box>
  )
}
