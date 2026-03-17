import {
  Typography, Box, Chip, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Button,
  TextField, MenuItem, InputAdornment, Tooltip, Card,
  CardActionArea, Dialog, DialogTitle, DialogContent,
  DialogActions, Select, FormControl, InputLabel,
} from '@mui/material'
import {
  Edit, Delete, Star, Search, Download, Folder as FolderIcon,
  ArrowBack, CreateNewFolder, DriveFileMove, FilterListOff,
} from '@mui/icons-material'
import { useState } from 'react'

interface Folder {
  id: number
  name: string
  color: string
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

const initialFolders: Folder[] = [
  { id: 1, name: 'Math 7th Grade', color: '#6f52dd', createdDate: '2025-01-05' },
  { id: 2, name: 'Functions', color: '#1565c0', createdDate: '2025-01-20' },
  { id: 3, name: 'Math and Movies', color: '#e65100', createdDate: '2025-02-10' },
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

// ─── Folder Grid View ────────────────────────────────────────────────────────

interface FolderGridProps {
  folders: Folder[]
  lessons: Lesson[]
  onOpenFolder: (folderId: number) => void
  onCreateFolder: () => void
  onDeleteFolder: (folderId: number) => void
  onRenameFolder: (folder: Folder) => void
  onDeleteLesson: (id: number) => void
  onMoveLesson: (lessonId: number, folderId: number) => void
}

function FolderGrid({
  folders, lessons, onOpenFolder, onCreateFolder,
  onDeleteFolder, onRenameFolder, onDeleteLesson, onMoveLesson,
}: FolderGridProps) {
  const countInFolder = (folderId: number) =>
    lessons.filter((l) => l.folderId === folderId).length

  // Unorganized filters
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterGrade, setFilterGrade] = useState('All')
  const [filterSubject, setFilterSubject] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const isFiltered = search !== '' || filterStatus !== 'All' || filterGrade !== 'All' || filterSubject !== 'All' || filterDate !== ''
  const clearFilters = () => { setSearch(''); setFilterStatus('All'); setFilterGrade('All'); setFilterSubject('All'); setFilterDate('') }

  const unorganized = lessons
    .filter((l) => l.folderId === null)
    .filter((l) => {
      if (search && !l.topic.toLowerCase().includes(search.toLowerCase())) return false
      if (filterStatus !== 'All' && l.status !== filterStatus) return false
      if (filterGrade !== 'All' && l.grade !== filterGrade) return false
      if (filterSubject !== 'All' && l.subject !== filterSubject) return false
      if (filterDate && l.dateCreated !== filterDate) return false
      return true
    })

  // Move-to-folder dialog state
  const [moveDialogOpen, setMoveDialogOpen] = useState(false)
  const [movingLessonId, setMovingLessonId] = useState<number | null>(null)
  const [targetFolderId, setTargetFolderId] = useState<number | ''>('')

  const openMoveDialog = (lessonId: number) => {
    setMovingLessonId(lessonId)
    setTargetFolderId('')
    setMoveDialogOpen(true)
  }

  const handleMoveConfirm = () => {
    if (movingLessonId !== null && targetFolderId !== '') {
      onMoveLesson(movingLessonId, targetFolderId as number)
    }
    setMoveDialogOpen(false)
  }

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
          onClick={onCreateFolder}
          sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' }, mt: 0.5 }}
        >
          New Folder
        </Button>
      </Box>

      {/* Folder cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 280px))', gap: 2, mb: 5 }}>
        {folders.map((folder) => (
          <Card key={folder.id} variant="outlined" sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={() => onOpenFolder(folder.id)} sx={{ p: 2, pb: 1, flex: 1 }}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <FolderIcon sx={{ fontSize: 40, color: folder.color }} />
                <Box flex={1} minWidth={0}>
                  <Typography fontWeight={600} noWrap>{folder.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {countInFolder(folder.id)} tool{countInFolder(folder.id) !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" display="block" mt={1.5}>
                Created {folder.createdDate}
              </Typography>
            </CardActionArea>

            <Box display="flex" justifyContent="flex-end" px={1} pb={0.5}>
              <Tooltip title="Rename">
                <IconButton size="small" onClick={() => onRenameFolder(folder)}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete folder">
                <IconButton size="small" color="error" onClick={() => onDeleteFolder(folder.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        ))}

        {folders.length === 0 && unorganized.length === 0 && (
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
              <FolderIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 1 }} />
              <Typography variant="h6" color="text.secondary">No folders yet</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Create a folder to start organizing your tools.
              </Typography>
              <Button variant="contained" startIcon={<CreateNewFolder />} onClick={onCreateFolder}
                sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}>
                New Folder
              </Button>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Unorganized Tools table */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={0.5}>Unorganized Tools</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Tools that haven't been added to a folder yet.
        </Typography>

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
            inputProps={{ sx: { '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } } }}
          />
          {isFiltered && (
            <Button size="small" startIcon={<FilterListOff fontSize="small" />} onClick={clearFilters} sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
              Clear filters
            </Button>
          )}
        </Box>

        <TableContainer component={Paper} variant="outlined">
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
              {unorganized.length > 0 ? unorganized.map((lesson) => (
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
                    <Tooltip title="Move to folder">
                      <IconButton size="small" color="primary" onClick={() => openMoveDialog(lesson.id)}>
                        <DriveFileMove fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary"><Edit fontSize="small" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton size="small" color="primary"><Download fontSize="small" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => onDeleteLesson(lesson.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary" py={3}>
                    {lessons.some((l) => l.folderId === null)
                      ? 'No tools match your filters.'
                      : 'All tools are organized in folders.'}
                  </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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

// ─── Folder Detail (Table) View ───────────────────────────────────────────────

interface FolderDetailProps {
  folderName: string
  lessons: Lesson[]
  onBack: () => void
  onDeleteLesson: (id: number) => void
}

function FolderDetail({ folderName, lessons, onBack, onDeleteLesson }: FolderDetailProps) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterGrade, setFilterGrade] = useState('All')
  const [filterSubject, setFilterSubject] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const isFiltered = search !== '' || filterStatus !== 'All' || filterGrade !== 'All' || filterSubject !== 'All' || filterDate !== ''
  const clearFilters = () => { setSearch(''); setFilterStatus('All'); setFilterGrade('All'); setFilterSubject('All'); setFilterDate('') }

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
      {/* Breadcrumb */}
      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
        <IconButton size="small" onClick={onBack} sx={{ color: '#6f52dd' }}>
          <ArrowBack />
        </IconButton>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          onClick={onBack}
        >
          My Tools
        </Typography>
        <Typography variant="body2" color="text.secondary">/</Typography>
        <Typography variant="body2" fontWeight={600}>{folderName}</Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1.5} mb={3}>
        <FolderIcon sx={{ fontSize: 32, color: '#6f52dd' }} />
        <Box>
          <Typography variant="h4" fontWeight={600}>{folderName}</Typography>
          <Typography variant="body1" color="text.secondary">
            {lessons.length} tool{lessons.length !== 1 ? 's' : ''} in this folder
          </Typography>
        </Box>
      </Box>

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
                    <IconButton size="small" color="primary"><Edit fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small" color="primary"><Download fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => onDeleteLesson(lesson.id)}>
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

// ─── Root Component ───────────────────────────────────────────────────────────

export default function Lessons() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons)

  // undefined = folder grid view; number = inside a specific folder
  const [openFolderId, setOpenFolderId] = useState<number | undefined>(undefined)

  // New / Rename folder dialog
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [folderNameInput, setFolderNameInput] = useState('')

  const handleOpenFolder = (folderId: number) => setOpenFolderId(folderId)
  const handleBack = () => setOpenFolderId(undefined)

  const handleDeleteLesson = (id: number) =>
    setLessons((prev) => prev.filter((l) => l.id !== id))

  const handleMoveLesson = (lessonId: number, folderId: number) =>
    setLessons((prev) => prev.map((l) => l.id === lessonId ? { ...l, folderId } : l))

  const handleDeleteFolder = (folderId: number) => {
    setFolders((prev) => prev.filter((f) => f.id !== folderId))
    setLessons((prev) => prev.map((l) => l.folderId === folderId ? { ...l, folderId: null } : l))
  }

  const openCreateDialog = () => {
    setEditingFolder(null)
    setFolderNameInput('')
    setDialogOpen(true)
  }

  const openRenameDialog = (folder: Folder) => {
    setEditingFolder(folder)
    setFolderNameInput(folder.name)
    setDialogOpen(true)
  }

  const handleDialogConfirm = () => {
    const name = folderNameInput.trim()
    if (!name) return

    if (editingFolder) {
      setFolders((prev) => prev.map((f) => f.id === editingFolder.id ? { ...f, name } : f))
    } else {
      const newId = Date.now()
      const color = FOLDER_COLORS[folders.length % FOLDER_COLORS.length]
      setFolders((prev) => [...prev, { id: newId, name, color, createdDate: new Date().toISOString().slice(0, 10) }])
    }
    setDialogOpen(false)
  }

  const currentFolder = folders.find((f) => f.id === openFolderId)
  const currentFolderLessons = lessons.filter((l) => l.folderId === openFolderId)

  return (
    <>
      {openFolderId === undefined ? (
        <FolderGrid
          folders={folders}
          lessons={lessons}
          onOpenFolder={handleOpenFolder}
          onCreateFolder={openCreateDialog}
          onDeleteFolder={handleDeleteFolder}
          onRenameFolder={openRenameDialog}
          onDeleteLesson={handleDeleteLesson}
          onMoveLesson={handleMoveLesson}
        />
      ) : (
        <FolderDetail
          folderName={currentFolder?.name ?? ''}
          lessons={currentFolderLessons}
          onBack={handleBack}
          onDeleteLesson={handleDeleteLesson}
        />
      )}

      {/* Create / Rename folder dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editingFolder ? 'Rename Folder' : 'New Folder'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Folder name"
            value={folderNameInput}
            onChange={(e) => setFolderNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDialogConfirm()}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleDialogConfirm}
            disabled={!folderNameInput.trim()}
            sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}
          >
            {editingFolder ? 'Rename' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
