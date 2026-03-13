import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material'
import { Edit, DeleteOutline, PersonAdd } from '@mui/icons-material'

const users = [
  { name: 'Alice Johnson', email: 'alice@school.edu', role: 'Teacher', status: 'Active' },
  { name: 'Bob Martinez', email: 'bob@school.edu', role: 'Teacher', status: 'Active' },
  { name: 'Clara Smith', email: 'clara@school.edu', role: 'Admin', status: 'Active' },
  { name: 'David Lee', email: 'david@school.edu', role: 'Teacher', status: 'Inactive' },
]

export default function UsersManagement() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1} flexWrap="wrap" gap={2}>
        <Typography variant="h4" fontWeight={600}>
          Users Management
        </Typography>
        <Button variant="contained" startIcon={<PersonAdd />}>Invite User</Button>
      </Box>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Manage who has access to your organization's account.
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.email} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>{u.name[0]}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>{u.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{u.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Chip
                    label={u.status}
                    size="small"
                    color={u.status === 'Active' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small"><Edit fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Remove">
                    <IconButton size="small" color="error"><DeleteOutline fontSize="small" /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
