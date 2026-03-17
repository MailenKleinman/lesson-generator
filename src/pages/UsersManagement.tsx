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
  TextField,
  MenuItem,
  InputAdornment,
  Stack,
} from '@mui/material'
import { Edit, DeleteOutline, PersonAdd, Search, FilterListOff } from '@mui/icons-material'
import { useState } from 'react'

const users = [
  { name: 'Alice Johnson', email: 'alice@school.edu', role: 'Teacher', status: 'Active', createdDate: '2024-08-15' },
  { name: 'Bob Martinez', email: 'bob@school.edu', role: 'Teacher', status: 'Active', createdDate: '2024-09-03' },
  { name: 'Clara Smith', email: 'clara@school.edu', role: 'Admin', status: 'Active', createdDate: '2024-07-20' },
  { name: 'David Lee', email: 'david@school.edu', role: 'Teacher', status: 'Inactive', createdDate: '2024-10-11' },
]

const roles = ['All', 'Teacher', 'Admin']
const statuses = ['All', 'Active', 'Inactive']

export default function UsersManagement() {
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const isFiltered = search !== '' || filterRole !== 'All' || filterStatus !== 'All' || filterDate !== ''
  const clearFilters = () => { setSearch(''); setFilterRole('All'); setFilterStatus('All'); setFilterDate('') }

  const filtered = users.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false
    if (filterRole !== 'All' && u.role !== filterRole) return false
    if (filterStatus !== 'All' && u.status !== filterStatus) return false
    if (filterDate && u.createdDate !== filterDate) return false
    return true
  })

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>Users Management</Typography>
        </Box>
        <Button variant="contained" startIcon={<PersonAdd />}>Invite User</Button>
      </Stack>

      {/* Search + Filters */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
        />
        <TextField select size="small" label="Role" value={filterRole} onChange={(e) => setFilterRole(e.target.value)} sx={{ minWidth: 130 }}>
          {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </TextField>
        <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ minWidth: 130 }}>
          {statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>
        <TextField
          type="date"
          size="small"
          label="Created Date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          sx={{ minWidth: 160 }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ sx: { '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } } }}
        />
        {isFiltered && (
          <Button size="small" startIcon={<FilterListOff fontSize="small" />} onClick={clearFilters} sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
            Clear filters
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((u) => (
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
                <TableCell>
                  <Typography variant="body2">{u.createdDate}</Typography>
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
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary" py={3}>No users match your filters.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
