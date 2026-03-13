import { Typography, Box, Paper, Stack, Avatar, TextField, Button, Divider } from '@mui/material'

export default function Profile() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Manage your personal information and account details.
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 560 }}>
        <Stack spacing={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 72, height: 72, fontSize: 28 }}>T</Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>Teacher Account</Typography>
              <Typography variant="body2" color="text.secondary">teacher@school.edu</Typography>
              <Button size="small" sx={{ mt: 0.5, pl: 0 }}>Change photo</Button>
            </Box>
          </Box>
          <Divider />
          <TextField label="First Name" defaultValue="Teacher" fullWidth />
          <TextField label="Last Name" defaultValue="Account" fullWidth />
          <TextField label="Email" defaultValue="teacher@school.edu" fullWidth />
          <TextField label="School / Organization" defaultValue="Springfield Elementary" fullWidth />
          <Box>
            <Button variant="contained">Save Changes</Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
