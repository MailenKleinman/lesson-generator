import {
  Typography, Box, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, IconButton,
  TextField, MenuItem, InputAdornment, Chip, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Select, FormControl, InputLabel,
} from '@mui/material'
import {
  Edit, Delete, Search, FilterListOff, Folder as FolderIcon,
  InsertDriveFile, CreateNewFolder, DriveFileMove, ChevronRight, Add,
} from '@mui/icons-material'
import { useState } from 'react'

interface Folder {
  id: number
  name: string
  color: string
  parentId: number | null
  createdDate: string
}

interface MathTemplate {
  id: number
  folderId: number | null
  domain: string
  domainCode: string
  description: string
  relatedStandards: string[]
  dateCreated: string
}

interface BreadcrumbEntry {
  id: number
  name: string
}

const initialFolders: Folder[] = [
  { id: 1, name: 'General Templates', color: '#6f52dd', parentId: null, createdDate: '2025-01-01' },
]

const initialTemplates: MathTemplate[] = [
  {
    id: 1,
    folderId: 1,
    domain: 'Ratios & Proportional Relationships',
    domainCode: 'NY-7.RP.1',
    description: 'Compute unit rates associated with ratios of fractions, including ratios of lengths and other quantities.',
    relatedStandards: ['NY-MLS', 'CCSS-M'],
    dateCreated: '2025-01-10',
  },
  {
    id: 2,
    folderId: null,
    domain: 'Expressions & Equations',
    domainCode: 'NY-7.EE.3',
    description: 'Solve multi-step real-life and mathematical problems posed with positive and negative rational numbers.',
    relatedStandards: ['NY-MLS'],
    dateCreated: '2025-01-18',
  },
  {
    id: 3,
    folderId: null,
    domain: 'Statistics & Probability',
    domainCode: 'NY-7.SP.5',
    description: 'Understand that the probability of a chance event is a number between 0 and 1 that expresses the likelihood of the event occurring.',
    relatedStandards: ['NY-MLS', 'CCSS-M', 'TEKS'],
    dateCreated: '2025-02-04',
  },
]

const FOLDER_COLORS = ['#6f52dd', '#2e7d32', '#c62828', '#1565c0', '#e65100', '#6a1b9a']

const domainOptions = [
  'All',
  'Ratios & Proportional Relationships',
  'The Number System',
  'Expressions & Equations',
  'Geometry',
  'Statistics & Probability',
  'Functions',
  'Number & Quantity',
  'Algebra',
  'Modeling',
]

const standardOptions = ['All', 'NY-MLS', 'CCSS-M', 'TEKS']

export default function MathTemplates() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [templates, setTemplates] = useState<MathTemplate[]>(initialTemplates)

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbEntry[]>([])
  const currentFolderId: number | null =
    breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].id : null

  // Filters
  const [search, setSearch] = useState('')
  const [filterDomain, setFilterDomain] = useState('All')
  const [filterStandard, setFilterStandard] = useState('All')
  const [filterDate, setFilterDate] = useState('')

  const isFiltered = search !== '' || filterDomain !== 'All' || filterStandard !== 'All' || filterDate !== ''
  const clearFilters = () => { setSearch(''); setFilterDomain('All'); setFilterStandard('All'); setFilterDate('') }

  // Folder dialog
  const [folderDialogOpen, setFolderDialogOpen] = useState(false)
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [folderNameInput, setFolderNameInput] = useState('')

  // Move dialog
  const [moveDialogOpen, setMoveDialogOpen] = useState(false)
  const [movingTemplateId, setMovingTemplateId] = useState<number | null>(null)
  const [targetFolderId, setTargetFolderId] = useState<number | ''>('')

  // ─── Navigation ────────────────────────────────────────────────────────────

  const navigateInto = (folder: Folder) => {
    setBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }])
    clearFilters()
  }

  const navigateTo = (index: number) => {
    setBreadcrumbs((prev) => (index === -1 ? [] : prev.slice(0, index + 1)))
    clearFilters()
  }

  // ─── Filtered rows ─────────────────────────────────────────────────────────

  const visibleFolders = folders
    .filter((f) => f.parentId === currentFolderId)
    .filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()))

  const visibleTemplates = templates
    .filter((t) => t.folderId === currentFolderId)
    .filter((t) => {
      if (search && !t.description.toLowerCase().includes(search.toLowerCase()) && !t.domainCode.toLowerCase().includes(search.toLowerCase())) return false
      if (filterDomain !== 'All' && t.domain !== filterDomain) return false
      if (filterStandard !== 'All' && !t.relatedStandards.includes(filterStandard)) return false
      if (filterDate && t.dateCreated !== filterDate) return false
      return true
    })

  const isEmpty = visibleFolders.length === 0 && visibleTemplates.length === 0

  // ─── Actions ───────────────────────────────────────────────────────────────

  const handleDeleteTemplate = (id: number) =>
    setTemplates((prev) => prev.filter((t) => t.id !== id))

  const handleDeleteFolder = (folderId: number) => {
    const collectDescendants = (id: number): number[] => {
      const children = folders.filter((f) => f.parentId === id).map((f) => f.id)
      return [id, ...children.flatMap(collectDescendants)]
    }
    const toDelete = new Set(collectDescendants(folderId))
    setFolders((prev) => prev.filter((f) => !toDelete.has(f.id)))
    setTemplates((prev) =>
      prev.map((t) => (t.folderId !== null && toDelete.has(t.folderId) ? { ...t, folderId: null } : t))
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

  const openMoveDialog = (templateId: number) => {
    setMovingTemplateId(templateId)
    setTargetFolderId('')
    setMoveDialogOpen(true)
  }

  const handleMoveConfirm = () => {
    if (movingTemplateId !== null && targetFolderId !== '') {
      setTemplates((prev) =>
        prev.map((t) => (t.id === movingTemplateId ? { ...t, folderId: targetFolderId as number } : t))
      )
    }
    setMoveDialogOpen(false)
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>Math Templates</Typography>
          <Typography variant="body1" color="text.secondary">
            Organize and manage math templates by domain and standard.
          </Typography>
        </Box>
        <Stack direction="row" gap={1} mt={0.5}>
          <Button
            variant="outlined"
            startIcon={<CreateNewFolder />}
            onClick={openCreateFolderDialog}
            sx={{ borderColor: '#6f52dd', color: '#6f52dd', '&:hover': { borderColor: '#5a3fc0', bgcolor: '#f5eeff' } }}
          >
            New Folder
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}
          >
            Add Template
          </Button>
        </Stack>
      </Stack>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.5} mb={2}>
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer', color: '#6f52dd', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => navigateTo(-1)}
          >
            Math Templates
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
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          size="small"
          placeholder="Search by description or code…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
        />
        <TextField
          select size="small" label="Domain" value={filterDomain}
          onChange={(e) => setFilterDomain(e.target.value)} sx={{ minWidth: 220 }}
        >
          {domainOptions.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
        </TextField>
        <TextField
          select size="small" label="Standard" value={filterStandard}
          onChange={(e) => setFilterStandard(e.target.value)} sx={{ minWidth: 130 }}
        >
          {standardOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>
        <TextField
          type="date" size="small" label="Date Created" value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)} sx={{ minWidth: 160 }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ sx: { '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } } }}
        />
        {isFiltered && (
          <Button size="small" startIcon={<FilterListOff fontSize="small" />} onClick={clearFilters} sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
            Clear filters
          </Button>
        )}
      </Box>

      {/* Unified file-explorer table */}
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '16%' }}><Typography fontWeight={600}>Domain</Typography></TableCell>
              <TableCell sx={{ width: '11%' }}><Typography fontWeight={600}>Domain Code</Typography></TableCell>
              <TableCell sx={{ width: '30%' }}><Typography fontWeight={600}>Description</Typography></TableCell>
              <TableCell sx={{ width: '20%' }}><Typography fontWeight={600}>Related Standards</Typography></TableCell>
              <TableCell sx={{ width: '11%' }}><Typography fontWeight={600}>Date Created</Typography></TableCell>
              <TableCell sx={{ width: '12%' }} align="right"><Typography fontWeight={600}>Actions</Typography></TableCell>
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
                <TableCell colSpan={4}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <FolderIcon sx={{ fontSize: 22, color: folder.color }} />
                    <Typography fontWeight={500}>{folder.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{folder.createdDate}</Typography>
                </TableCell>
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

            {/* ── Template rows ── */}
            {visibleTemplates.map((template) => (
              <TableRow key={`template-${template.id}`} hover>
                <TableCell sx={{ overflow: 'hidden' }}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <InsertDriveFile sx={{ fontSize: 20, color: 'text.disabled', flexShrink: 0 }} />
                    <Typography variant="body2" noWrap>{template.domain}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500} color="#6f52dd">{template.domainCode}</Typography>
                </TableCell>
                <TableCell sx={{ overflow: 'hidden' }}>
                  <Tooltip title={template.description} placement="top-start">
                    <Typography variant="body2" noWrap>{template.description}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={0.5} flexWrap="wrap">
                    {template.relatedStandards.map((s) => (
                      <Chip key={s} label={s} size="small" sx={{ bgcolor: '#ede9fb', color: '#6f52dd', fontWeight: 500 }} />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{template.dateCreated}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Move to folder">
                    <IconButton size="small" color="primary" onClick={() => openMoveDialog(template.id)}>
                      <DriveFileMove fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" color="primary">
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => handleDeleteTemplate(template.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {/* ── Empty state ── */}
            {isEmpty && (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
            autoFocus fullWidth label="Folder name" value={folderNameInput}
            onChange={(e) => setFolderNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFolderDialogConfirm()}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFolderDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained" onClick={handleFolderDialogConfirm}
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
              label="Select folder" value={targetFolderId}
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
            variant="contained" onClick={handleMoveConfirm}
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
