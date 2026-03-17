import {
  Typography, Box, Button, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, IconButton,
  TextField, MenuItem, InputAdornment,
} from '@mui/material'
import { Add, Edit, Delete, Search, LinkOutlined, InsertDriveFileOutlined, FilterListOff } from '@mui/icons-material'
import { useState } from 'react'

type SourceType = 'url' | 'document' | 'none'

interface Topic {
  id: number
  description: string
  sourceType: SourceType
  sourceValue: string
  category: string
  subcategory: string
  createdDate: string
}

const initialTopics: Topic[] = [
  { id: 1, description: 'Michael Jordan', sourceType: 'url', sourceValue: 'https://examplesource.com', category: 'People', subcategory: 'Athletes', createdDate: '2024-08-10' },
  { id: 2, description: 'Harlem Renaissance', sourceType: 'document', sourceValue: 'harlem_renaissance.pdf', category: 'Culture', subcategory: 'Art', createdDate: '2024-08-14' },
  { id: 3, description: 'Civil Rights Movement', sourceType: 'url', sourceValue: 'https://examplesource.com', category: 'Places & Events', subcategory: 'U.S. Black History', createdDate: '2024-08-20' },
  { id: 4, description: 'Katherine Johnson', sourceType: 'document', sourceValue: 'katherine_johnson.pdf', category: 'People', subcategory: 'Scientists & Mathematicians', createdDate: '2024-09-02' },
  { id: 5, description: 'Hip-Hop Origins', sourceType: 'none', sourceValue: '', category: 'Culture', subcategory: 'Music', createdDate: '2024-09-15' },
  { id: 6, description: 'Ancient Egypt', sourceType: 'url', sourceValue: 'https://examplesource.com', category: 'Places & Events', subcategory: 'History of Africa', createdDate: '2024-09-22' },
  { id: 7, description: 'Serena Williams', sourceType: 'none', sourceValue: '', category: 'People', subcategory: 'Athletes', createdDate: '2024-10-05' },
  { id: 8, description: 'Kwanzaa', sourceType: 'document', sourceValue: 'kwanzaa_traditions.pdf', category: 'Culture', subcategory: 'Traditions & Holidays', createdDate: '2024-10-18' },
]

const categories = ['All', 'People', 'Culture', 'Places & Events']
const sourceTypes = ['All', 'URL', 'Document', 'None']

const subcategoryMap: Record<string, string[]> = {
  'People': ['Activists', 'Athletes', 'Authors', 'Characters', 'Entertainers', 'Entrepreneurs', 'Inventors', 'Politicians', 'Scholars', 'Scientists & Mathematicians'],
  'Culture': ['Art', 'Cuisine', 'Dance', 'Film', 'Music', 'Traditions & Holidays'],
  'Places & Events': ['African Diaspora', 'History of Africa', 'U.S. Black History'],
}

function SourceCell({ type, value }: { type: SourceType; value: string }) {
  if (type === 'url') {
    return (
      <Box display="flex" alignItems="center" gap={0.5}>
        <LinkOutlined sx={{ fontSize: 15, color: '#6f52dd' }} />
        <Typography
          variant="body2"
          component="a"
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#6f52dd', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {value.replace(/^https?:\/\//, '')}
        </Typography>
      </Box>
    )
  }
  if (type === 'document') {
    return (
      <Box display="flex" alignItems="center" gap={0.5}>
        <InsertDriveFileOutlined sx={{ fontSize: 15, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">{value}</Typography>
      </Box>
    )
  }
  return <Typography variant="body2" color="text.disabled">—</Typography>
}

export default function TopicManagement() {
  const [topics, setTopics] = useState<Topic[]>(initialTopics)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterSubcategory, setFilterSubcategory] = useState('All')
  const [filterSourceType, setFilterSourceType] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const subcategoryOptions = filterCategory !== 'All'
    ? ['All', ...(subcategoryMap[filterCategory] ?? [])]
    : ['All']

  const isFiltered = search !== '' || filterCategory !== 'All' || filterSubcategory !== 'All' || filterSourceType !== 'All' || filterDate !== ''
  const clearFilters = () => { setSearch(''); setFilterCategory('All'); setFilterSubcategory('All'); setFilterSourceType('All'); setFilterDate('') }

  const handleCategoryChange = (value: string) => {
    setFilterCategory(value)
    setFilterSubcategory('All')
  }

  const handleDelete = (id: number) => {
    setTopics((prev) => prev.filter((t) => t.id !== id))
  }

  const filtered = topics.filter((t) => {
    if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false
    if (filterCategory !== 'All' && t.category !== filterCategory) return false
    if (filterSubcategory !== 'All' && t.subcategory !== filterSubcategory) return false
    if (filterSourceType !== 'All') {
      const map: Record<string, SourceType> = { URL: 'url', Document: 'document', None: 'none' }
      if (t.sourceType !== map[filterSourceType]) return false
    }
    if (filterDate && t.createdDate !== filterDate) return false
    return true
  })

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>Topics</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>Add Topic</Button>
      </Stack>

      {/* Search + Filters */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Search topics…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
        />
        <TextField select size="small" label="Category" value={filterCategory} onChange={(e) => handleCategoryChange(e.target.value)} sx={{ minWidth: 160 }}>
          {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField select size="small" label="Subcategory" value={filterSubcategory} onChange={(e) => setFilterSubcategory(e.target.value)} sx={{ minWidth: 200 }} disabled={filterCategory === 'All'}>
          {subcategoryOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>
        <TextField select size="small" label="Source" value={filterSourceType} onChange={(e) => setFilterSourceType(e.target.value)} sx={{ minWidth: 140 }}>
          {sourceTypes.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
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
              <TableCell><Typography fontWeight={600}>Category</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Subcategory</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Source</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Created Date</Typography></TableCell>
              <TableCell align="right"><Typography fontWeight={600}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((topic) => (
              <TableRow key={topic.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>{topic.description}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={topic.category} size="small" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{topic.subcategory}</Typography>
                </TableCell>
                <TableCell>
                  <SourceCell type={topic.sourceType} value={topic.sourceValue} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{topic.createdDate}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(topic.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" py={3}>No topics match your filters.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
