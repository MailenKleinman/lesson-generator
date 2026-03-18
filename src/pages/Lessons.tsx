import {
  Typography, Box, Chip, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Button,
  TextField, MenuItem, InputAdornment, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Select, FormControl, InputLabel,
} from '@mui/material'
import {
  Edit, Delete, Star, Search, Download, Folder as FolderIcon,
  CreateNewFolder, DriveFileMove, FilterListOff, InsertDriveFile,
  ChevronRight,
} from '@mui/icons-material'
import { useState } from 'react'

interface Folder {
  id: number
  name: string
  color: string
  parentId: number | null
  createdDate: string
}

interface Lesson {
  id: number
  folderId: number | null
  topic: string
  status: 'Published' | 'Draft'
  grade: string
  subject: string
  dateCreated: string
  rating: number | null
}

interface BreadcrumbEntry {
  id: number
  name: string
}

const initialFolders: Folder[] = [
  { id: 1, name: 'Math 7th Grade', color: '#6f52dd', parentId: null, createdDate: '2025-01-05' },
  { id: 2, name: 'Functions', color: '#6f52dd', parentId: null, createdDate: '2025-01-20' },
  { id: 3, name: 'Math and Movies', color: '#6f52dd', parentId: null, createdDate: '2025-02-10' },
]

const initialLessons: Lesson[] = [
  { id: 1, folderId: 1, topic: 'Measurement & Data with Hip hop origins', status: 'Published', grade: '7', subject: 'Math', dateCreated: '2025-01-10', rating: 4 },
  { id: 2, folderId: 1, topic: 'Fractions with Serena Williams', status: 'Published', grade: '7', subject: 'Math', dateCreated: '2025-01-18', rating: 5 },
  { id: 3, folderId: 2, topic: 'Functions with Civil Rights Movement in the US', status: 'Published', grade: '10', subject: 'Math', dateCreated: '2025-02-03', rating: 3 },
  { id: 4, folderId: 2, topic: 'Number & Quantity with Hidden Figures', status: 'Draft', grade: '6', subject: 'Math', dateCreated: '2025-02-15', rating: null },
  { id: 5, folderId: 3, topic: 'Measurement & Data with Double Dutch', status: 'Published', grade: '4', subject: 'Math', dateCreated: '2025-03-01', rating: 4 },
  { id: 6, folderId: null, topic: 'Algebra I with Lewis Howard Latimer', status: 'Draft', grade: '12', subject: 'Math', dateCreated: '2025-03-08', rating: null },
  { id: 7, folderId: null, topic: 'Algebra I with Adinkra Symbols', status: 'Published', grade: '9', subject: 'Math', dateCreated: '2025-03-10', rating: 3 },
]

const FOLDER_COLORS = ['#6f52dd', '#2e7d32', '#c62828', '#1565c0', '#e65100', '#6a1b9a']

const grades = ['All', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const subjects = ['All', 'Math', 'Science', 'History', 'English', 'CS', 'ELA', 'Art', 'Music']
const statuses = ['All', 'Published', 'Draft']

export default function Lessons() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons)

  // breadcrumbs stack — empty = root; each entry is a folder navigated into
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbEntry[]>([])
  const currentFolderId: number | null =
    breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].id : null

  // Filters
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterGrade, setFilterGrade] = useState('All')
  const [filterSubject, setFilterSubject] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const isFiltered =
    search !== '' || filterStatus !== 'All' || filterGrade !== 'All' ||
    filterSubject !== 'All' || filterDate !== ''

  const clearFilters = () => {
    setSearch('')
    setFilterStatus('All')
    setFilterGrade('All')
    setFilterSubject('All')
    setFilterDate('')
  }

  // Folder dialog (create / rename)
  const [folderDialogOpen, setFolderDialogOpen] = useState(false)
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [folderNameInput, setFolderNameInput] = useState('')

  // Move-to-folder dialog
  const [moveDialogOpen, setMoveDialogOpen] = useState(false)
  const [movingLessonId, setMovingLessonId] = useState<number | null>(null)
  const [targetFolderId, setTargetFolderId] = useState<number | ''>('')

  // ─── Navigation ────────────────────────────────────────────────────────────

  const navigateInto = (folder: Folder) => {
    setBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }])
    clearFilters()
  }

  // index -1 = go back to root
  const navigateTo = (index: number) => {
    setBreadcrumbs((prev) => (index === -1 ? [] : prev.slice(0, index + 1)))
    clearFilters()
  }

  // ─── Filtered rows ─────────────────────────────────────────────────────────

  const visibleFolders = folders
    .filter((f) => f.parentId === currentFolderId)
    .filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()))

  const visibleLessons = lessons
    .filter((l) => l.folderId === currentFolderId)
    .filter((l) => {
      if (search && !l.topic.toLowerCase().includes(search.toLowerCase())) return false
      if (filterStatus !== 'All' && l.status !== filterStatus) return false
      if (filterGrade !== 'All' && l.grade !== filterGrade) return false
      if (filterSubject !== 'All' && l.subject !== filterSubject) return false
      if (filterDate && l.dateCreated !== filterDate) return false
      return true
    })

  const isEmpty = visibleFolders.length === 0 && visibleLessons.length === 0

  // ─── Actions ───────────────────────────────────────────────────────────────

  const handleDeleteLesson = (id: number) =>
    setLessons((prev) => prev.filter((l) => l.id !== id))

  const handleDeleteFolder = (folderId: number) => {
    // Collect this folder and all descendants recursively
    const collectDescendants = (id: number): number[] => {
      const children = folders.filter((f) => f.parentId === id).map((f) => f.id)
      return [id, ...children.flatMap(collectDescendants)]
    }
    const toDelete = new Set(collectDescendants(folderId))
    setFolders((prev) => prev.filter((f) => !toDelete.has(f.id)))
    setLessons((prev) =>
      prev.map((l) => (l.folderId !== null && toDelete.has(l.folderId) ? { ...l, folderId: null } : l))
    )
  }

  const openCreateFolderDialog = () => {
    setEditingFolder(null)
    setFolderNameInput('')
    setFolderDialogOpen(true)
  }

  const openRenameFolderDialog = (folder: Folder) => {
    setEditingFolder(folder)
    setFolderNameInput(folder.name)
    setFolderDialogOpen(true)
  }

  const handleFolderDialogConfirm = () => {
    const name = folderNameInput.trim()
    if (!name) return

    if (editingFolder) {
      setFolders((prev) => prev.map((f) => (f.id === editingFolder.id ? { ...f, name } : f)))
      // Keep breadcrumb label in sync
      setBreadcrumbs((prev) => prev.map((b) => (b.id === editingFolder.id ? { ...b, name } : b)))
    } else {
      const newId = Date.now()
      const color = FOLDER_COLORS[folders.length % FOLDER_COLORS.length]
      setFolders((prev) => [
        ...prev,
        { id: newId, name, color, parentId: currentFolderId, createdDate: new Date().toISOString().slice(0, 10) },
      ])
    }
    setFolderDialogOpen(false)
  }

  const openMoveDialog = (lessonId: number) => {
    setMovingLessonId(lessonId)
    setTargetFolderId('')
    setMoveDialogOpen(true)
  }

  const handleMoveConfirm = () => {
    if (movingLessonId !== null && targetFolderId !== '') {
      setLessons((prev) =>
        prev.map((l) => (l.id === movingLessonId ? { ...l, folderId: targetFolderId as number } : l))
      )
    }
    setMoveDialogOpen(false)
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>My Tools</Typography>
          <Typography variant="body1" color="text.secondary" mt={0.5}>
            Browse and manage your tools library.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<CreateNewFolder />}
          onClick={openCreateFolderDialog}
          sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' }, mt: 0.5 }}
        >
          New Folder
        </Button>
      </Box>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.5} mb={2}>
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer', color: '#6f52dd', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => navigateTo(-1)}
          >
            My Tools
          </Typography>
          {breadcrumbs.map((b, i) => (
            <Box key={b.id} display="flex" alignItems="center" gap={0.5}>
              <ChevronRight sx={{ fontSize: 16, color: 'text.disabled' }} />
              {i < breadcrumbs.length - 1 ? (
                <Typography
                  variant="body2"
                  sx={{ cursor: 'pointer', color: '#6f52dd', '&:hover': { textDecoration: 'underline' } }}
                  onClick={() => navigateTo(i)}
                >
                  {b.name}
                </Typography>
              ) : (
                <Typography variant="body2" fontWeight={600}>{b.name}</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Filters */}
      <Box display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr 1fr" gap={2} mb={2}>
        <TextField
          placeholder="Search folders and tools..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
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
          inputProps={{ sx: { '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } } }}
        />
        {isFiltered && (
          <Button
            size="small"
            startIcon={<FilterListOff fontSize="small" />}
            onClick={clearFilters}
            sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
          >
            Clear filters
          </Button>
        )}
      </Box>

      {/* Unified file-explorer table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={600}>Name</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Status</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Grade</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Subject</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Date Created</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Rate Tool</Typography></TableCell>
              <TableCell align="right"><Typography fontWeight={600}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ── Folder rows ── */}
            {visibleFolders.map((folder) => (
              <TableRow
                key={`folder-${folder.id}`}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigateInto(folder)}
              >
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <FolderIcon sx={{ fontSize: 22, color: folder.color }} />
                    <Typography fontWeight={500}>{folder.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{folder.createdDate}</Typography>
                </TableCell>
                <TableCell />
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Rename">
                    <IconButton size="small" onClick={() => openRenameFolderDialog(folder)}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete folder">
                    <IconButton size="small" color="error" onClick={() => handleDeleteFolder(folder.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {/* ── Lesson rows ── */}
            {visibleLessons.map((lesson) => (
              <TableRow key={`lesson-${lesson.id}`} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <InsertDriveFile sx={{ fontSize: 20, color: 'text.disabled' }} />
                    <Typography>{lesson.topic}</Typography>
                  </Box>
                </TableCell>
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
                  <Tooltip title="Move to folder">
                    <IconButton size="small" color="primary" onClick={() => openMoveDialog(lesson.id)}>
                      <DriveFileMove fontSize="small" />
                    </IconButton>
                  </Tooltip>
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
                    <IconButton size="small" color="error" onClick={() => handleDeleteLesson(lesson.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {/* ── Empty state ── */}
            {isEmpty && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box py={5} display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <FolderIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                    <Typography color="text.secondary">
                      {isFiltered ? 'No items match your filters.' : 'This folder is empty.'}
                    </Typography>
                    {!isFiltered && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CreateNewFolder />}
                        onClick={openCreateFolderDialog}
                        sx={{ mt: 1 }}
                      >
                        New Folder
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create / Rename folder dialog */}
      <Dialog open={folderDialogOpen} onClose={() => setFolderDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editingFolder ? 'Rename Folder' : 'New Folder'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Folder name"
            value={folderNameInput}
            onChange={(e) => setFolderNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFolderDialogConfirm()}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFolderDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleFolderDialogConfirm}
            disabled={!folderNameInput.trim()}
            sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}
          >
            {editingFolder ? 'Rename' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Move to folder dialog */}
      <Dialog open={moveDialogOpen} onClose={() => setMoveDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Move to Folder</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Select folder</InputLabel>
            <Select
              label="Select folder"
              value={targetFolderId}
              onChange={(e) => setTargetFolderId(e.target.value as number)}
            >
              {folders.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <FolderIcon sx={{ fontSize: 18, color: f.color }} />
                    {f.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoveDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleMoveConfirm}
            disabled={targetFolderId === ''}
            sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}
          >
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
