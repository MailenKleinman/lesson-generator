import {
  Typography, Box, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, IconButton,
  TextField, MenuItem, InputAdornment, Chip, Tooltip,
} from '@mui/material'
import { Add, Edit, Delete, Search, FilterListOff, LinkOutlined, PictureAsPdf, Description, Article } from '@mui/icons-material'
import { useState } from 'react'

type FileType = 'pdf' | 'word' | 'article' | 'none'

interface Source {
  id: number
  description: string
  author: string
  tags: string[]
  url: string
  fileType: FileType
  dateAdded: string
}

const initialSources: Source[] = [
  {
    id: 1,
    description: 'DeFT: A conceptual framework for considering learning with multiple representations',
    author: 'Ainsworth, S.',
    tags: ['Representations', 'Framework'],
    url: 'https://doi.org/10.1016/j.learninstruc.2006.03.001',
    fileType: 'article',
    dateAdded: '2024-08-05',
  },
  {
    id: 2,
    description: 'Representations and translations among representations in mathematics learning and problem solving',
    author: 'Lesh, R., Post, T., & Behr, M.',
    tags: ['Representations', 'Problem Solving'],
    url: '',
    fileType: 'pdf',
    dateAdded: '2024-08-05',
  },
  {
    id: 3,
    description: 'Principles to actions: Ensuring mathematical success for all',
    author: 'NCTM',
    tags: ['Standards', 'Best Practices'],
    url: '',
    fileType: 'pdf',
    dateAdded: '2024-08-10',
  },
  {
    id: 4,
    description: '5 practices for orchestrating productive mathematics discussions (2nd ed.)',
    author: 'Smith, M. S., & Stein, M. K.',
    tags: ['Discussion', 'Pedagogy'],
    url: '',
    fileType: 'word',
    dateAdded: '2024-09-01',
  },
  {
    id: 5,
    description: 'The 5 practices in practice: Successfully orchestrating mathematical discourse in your middle school classroom',
    author: 'Smith, M. S., Bill, V., & Sherin, B. L.',
    tags: ['Discussion', 'Middle School'],
    url: '',
    fileType: 'word',
    dateAdded: '2024-09-01',
  },
  {
    id: 6,
    description: 'Taking action: Implementing effective mathematics teaching practices in grades 6–8',
    author: 'Smith, M. S., Steele, M. D., & Raith, M. L.',
    tags: ['Teaching Practices', 'Grades 6–8'],
    url: '',
    fileType: 'pdf',
    dateAdded: '2024-09-15',
  },
]

const allTags = ['All', ...Array.from(new Set(initialSources.flatMap((s) => s.tags)))]
const fileTypes = ['All', 'PDF', 'Word', 'Article', 'None']

const fileTypeConfig: Record<FileType, { label: string; color: string; icon: React.ReactNode }> = {
  pdf:     { label: 'PDF',     color: '#d32f2f', icon: <PictureAsPdf sx={{ fontSize: 14 }} /> },
  word:    { label: 'Word',    color: '#1565c0', icon: <Description sx={{ fontSize: 14 }} /> },
  article: { label: 'Article', color: '#2e7d32', icon: <Article sx={{ fontSize: 14 }} /> },
  none:    { label: '—',       color: 'text.disabled', icon: null },
}

export default function SourceManagement() {
  const [sources, setSources] = useState<Source[]>(initialSources)
  const [search, setSearch] = useState('')
  const [filterTag, setFilterTag] = useState('All')
  const [filterFileType, setFilterFileType] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const isFiltered = search !== '' || filterTag !== 'All' || filterFileType !== 'All' || filterDate !== ''
  const clearFilters = () => { setSearch(''); setFilterTag('All'); setFilterFileType('All'); setFilterDate('') }

  const handleDelete = (id: number) => setSources((prev) => prev.filter((s) => s.id !== id))

  const filtered = sources.filter((s) => {
    if (search && !s.description.toLowerCase().includes(search.toLowerCase()) && !s.author.toLowerCase().includes(search.toLowerCase())) return false
    if (filterTag !== 'All' && !s.tags.includes(filterTag)) return false
    if (filterFileType !== 'All' && s.fileType !== filterFileType.toLowerCase()) return false
    if (filterDate && s.dateAdded !== filterDate) return false
    return true
  })

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>Sources</Typography>
          <Typography variant="body1" color="text.secondary">
            Manage research sources used to inform lesson generation.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>Add Source</Button>
      </Stack>

      {/* Search + Filters */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          size="small"
          placeholder="Search by description or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 300 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
        />
        <TextField select size="small" label="Tag" value={filterTag} onChange={(e) => setFilterTag(e.target.value)} sx={{ minWidth: 160 }}>
          {allTags.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
        <TextField select size="small" label="File Type" value={filterFileType} onChange={(e) => setFilterFileType(e.target.value)} sx={{ minWidth: 130 }}>
          {fileTypes.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
        <TextField
          type="date"
          size="small"
          label="Date Added"
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
              <TableCell><Typography fontWeight={600}>Author</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Tags</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>URL / DOI</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>File Type</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Date Added</Typography></TableCell>
              <TableCell align="right"><Typography fontWeight={600}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((source) => {
              const ft = fileTypeConfig[source.fileType]
              return (
                <TableRow key={source.id} hover>
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography variant="body2">{source.description}</Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 180 }}>
                    <Typography variant="body2">{source.author}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" gap={0.5} flexWrap="wrap">
                      {source.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {source.url ? (
                      <Tooltip title={source.url}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <LinkOutlined sx={{ fontSize: 15, color: '#6f52dd' }} />
                          <Typography
                            variant="body2"
                            component="a"
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: '#6f52dd', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                          >
                            {source.url.replace('https://doi.org/', 'DOI: ')}
                          </Typography>
                        </Box>
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" color="text.disabled">—</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {source.fileType !== 'none' ? (
                      <Chip
                        icon={ft.icon as React.ReactElement}
                        label={ft.label}
                        size="small"
                        sx={{ bgcolor: `${ft.color}18`, color: ft.color, fontWeight: 500, border: `1px solid ${ft.color}40` }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.disabled">—</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{source.dateAdded}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary">
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(source.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary" py={3}>No sources match your filters.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
