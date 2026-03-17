import {
  Typography, Box, Button, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, IconButton,
  TextField, MenuItem, InputAdornment,
} from '@mui/material'
import { Add, Edit, Delete, Search, FilterListOff } from '@mui/icons-material'
import { useState } from 'react'

interface Standard {
  id: number
  description: string
  tags: string[]
  createdDate: string
}

const initialStandards: Standard[] = [
  { id: 1, description: 'New York State Mathematics Learning Standards (NY-MLS)', tags: ['Math', 'New York'], createdDate: '2024-08-01' },
  { id: 2, description: 'Common Core State Standards for Mathematics (CCSS-M)', tags: ['Math', 'Common Core', 'National'], createdDate: '2024-08-15' },
  { id: 4, description: 'Tennessee Essential Knowledge and Skills (TEKS) – Mathematics', tags: ['Math', 'Tennessee'], createdDate: '2024-09-10' },
]

const allTags = ['All', ...Array.from(new Set(initialStandards.flatMap((s) => s.tags)))]

export default function AddStandards() {
  const [standards, setStandards] = useState<Standard[]>(initialStandards)
  const [search, setSearch] = useState('')
  const [filterTag, setFilterTag] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const isFiltered = search !== '' || filterTag !== 'All' || filterDate !== ''
  const clearFilters = () => { setSearch(''); setFilterTag('All'); setFilterDate('') }

  const handleDelete = (id: number) => {
    setStandards((prev) => prev.filter((s) => s.id !== id))
  }

  const filtered = standards.filter((s) => {
    if (search && !s.description.toLowerCase().includes(search.toLowerCase())) return false
    if (filterTag !== 'All' && !s.tags.includes(filterTag)) return false
    if (filterDate && s.createdDate !== filterDate) return false
    return true
  })

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>Standards</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Standard
        </Button>
      </Stack>

      {/* Search + Filters */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Search standards…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 280 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
        />
        <TextField select size="small" label="Tag" value={filterTag} onChange={(e) => setFilterTag(e.target.value)} sx={{ minWidth: 160 }}>
          {allTags.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
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
              <TableCell><Typography fontWeight={600}>Description</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Tags</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Created Date</Typography></TableCell>
              <TableCell align="right"><Typography fontWeight={600}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((standard) => (
              <TableRow key={standard.id} hover>
                <TableCell>{standard.description}</TableCell>
                <TableCell>
                  <Stack direction="row" gap={0.5} flexWrap="wrap">
                    {standard.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{standard.createdDate}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(standard.id)} color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary" py={3}>No standards match your filters.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
