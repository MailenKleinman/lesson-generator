import {
  Typography, Box, Chip, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Button,
  TextField, MenuItem, InputAdornment, Tooltip,
} from '@mui/material'
import { Edit, Delete, Star, Search, Download } from '@mui/icons-material'
import { useState } from 'react'

interface Lesson {
  id: number
  topic: string
  status: 'Published' | 'Draft'
  grade: string
  subject: string
  dateCreated: string
  rating: number | null
}

const initialLessons: Lesson[] = [
  { id: 1, topic: 'Introduction to Algebra', status: 'Published', grade: '7', subject: 'Math', dateCreated: '2025-01-10', rating: 4 },
  { id: 2, topic: 'The Water Cycle', status: 'Draft', grade: '5', subject: 'Science', dateCreated: '2025-02-03', rating: null },
  { id: 3, topic: 'World War II Overview', status: 'Published', grade: '10', subject: 'History', dateCreated: '2025-02-18', rating: 5 },
  { id: 4, topic: 'Reading Comprehension Basics', status: 'Published', grade: '4', subject: 'English', dateCreated: '2025-03-01', rating: 3 },
  { id: 5, topic: 'Introduction to Python', status: 'Draft', grade: '9', subject: 'CS', dateCreated: '2025-03-08', rating: null },
]

const grades = ['All', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const subjects = ['All', 'Math', 'Science', 'History', 'English', 'CS', 'ELA', 'Art', 'Music']
const statuses = ['All', 'Published', 'Draft']

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterGrade, setFilterGrade] = useState('All')
  const [filterSubject, setFilterSubject] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const handleDelete = (id: number) => setLessons((prev) => prev.filter((l) => l.id !== id))

  const filtered = lessons.filter((l) => {
    if (search && !l.topic.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStatus !== 'All' && l.status !== filterStatus) return false
    if (filterGrade !== 'All' && l.grade !== filterGrade) return false
    if (filterSubject !== 'All' && l.subject !== filterSubject) return false
    if (filterDate && l.dateCreated !== filterDate) return false
    return true
  })

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>My Tools</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Browse and manage your tools library.
      </Typography>

      {/* Search + Filters */}
      <Box display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr 1fr" gap={2} mb={2}>
        <TextField
          placeholder="Search tools..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
        />
        <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          {statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>
        <TextField select size="small" label="Grade" value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}>
          {grades.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
        </TextField>
        <TextField select size="small" label="Subject" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
          {subjects.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>
        <TextField
          size="small"
          label="Date"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={600}>Topic</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Status</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Grade</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Subject</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Date Created</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Rate Tool</Typography></TableCell>
              <TableCell align="right"><Typography fontWeight={600}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length > 0 ? filtered.map((lesson) => (
              <TableRow key={lesson.id} hover>
                <TableCell>{lesson.topic}</TableCell>
                <TableCell>
                  <Chip
                    label={lesson.status}
                    size="small"
                    color={lesson.status === 'Published' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>{lesson.grade}</TableCell>
                <TableCell>{lesson.subject}</TableCell>
                <TableCell>{lesson.dateCreated}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" startIcon={<Star />}>Rate</Button>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small" color="primary">
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small" color="primary">
                      <Download fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => handleDelete(lesson.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary" py={3}>No tools match your filters.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
