import { Box, Typography, Breadcrumbs, Link, Card, TextField, Divider, List, ListItemButton, ListItemText, IconButton, Button, Tooltip } from '@mui/material'
import { NavigateNext, Add, DeleteOutline, Settings } from '@mui/icons-material'
import { useState } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const gradeDomainMap: Record<string, string[]> = {
  'K':  ['Counting & Cardinality', 'Operations & Algebraic Thinking', 'Number & Operations in Base Ten', 'Measurement & Data', 'Geometry'],
  '1':  ['Operations & Algebraic Thinking', 'Number & Operations in Base Ten', 'Measurement & Data', 'Geometry'],
  '2':  ['Operations & Algebraic Thinking', 'Number & Operations in Base Ten', 'Measurement & Data', 'Geometry'],
  '3':  ['Operations & Algebraic Thinking', 'Number & Operations in Base Ten', 'Number & Operations – Fractions', 'Measurement & Data', 'Geometry'],
  '4':  ['Operations & Algebraic Thinking', 'Number & Operations in Base Ten', 'Number & Operations – Fractions', 'Measurement & Data', 'Geometry'],
  '5':  ['Operations & Algebraic Thinking', 'Number & Operations in Base Ten', 'Number & Operations – Fractions', 'Measurement & Data', 'Geometry'],
  '6':  ['Ratios & Proportional Relationships', 'The Number System', 'Expressions & Equations', 'Geometry', 'Statistics & Probability'],
  '7':  ['Ratios & Proportional Relationships', 'The Number System', 'Expressions & Equations', 'Geometry', 'Statistics & Probability'],
  '8':  ['The Number System', 'Expressions & Equations', 'Functions', 'Geometry', 'Statistics & Probability'],
  '9':  ['Number & Quantity', 'Algebra', 'Functions', 'Geometry', 'Statistics & Probability'],
  '10': ['Number & Quantity', 'Algebra', 'Functions', 'Geometry', 'Statistics & Probability'],
  '11': ['Number & Quantity', 'Algebra', 'Functions', 'Geometry', 'Statistics & Probability', 'Modeling'],
  '12': ['Number & Quantity', 'Algebra', 'Functions', 'Geometry', 'Statistics & Probability', 'Modeling'],
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface EditStandardProps {
  standardId: number | null
  standardDescription: string
  onBack: () => void
}

// ─── Column shell ──────────────────────────────────────────────────────────────

function Column({ title, subtitle, disabled, width, children }: {
  title: string
  subtitle?: string
  disabled?: boolean
  width?: number | string
  children: React.ReactNode
}) {
  return (
    <Box sx={{ flex: width ? 'none' : 1, width, display: 'flex', flexDirection: 'column', opacity: disabled ? 0.4 : 1, transition: 'opacity 0.2s' }}>
      <Box px={2.5} pt={2.5} pb={1.5}>
        <Typography variant="body2" fontWeight={700} color={disabled ? 'text.disabled' : 'text.primary'}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
        )}
      </Box>
      <Divider />
      {children}
    </Box>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CodeEntry {
  id: number
  code: string
  description: string
}

const emptyEntry = (): CodeEntry => ({ id: Date.now(), code: '', description: '' })

export default function EditStandard({ standardDescription, onBack }: EditStandardProps) {
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('')
  const [entries, setEntries] = useState<CodeEntry[]>([emptyEntry()])

  // Template sub-view
  const [view, setView] = useState<'standard' | 'template'>('standard')
  const [templateEntry, setTemplateEntry] = useState<CodeEntry | null>(null)

  const openTemplate = (entry: CodeEntry) => {
    setTemplateEntry(entry)
    setView('template')
  }

  const closeTemplate = () => {
    setView('standard')
    setTemplateEntry(null)
  }

  const domains = selectedGrade ? gradeDomainMap[selectedGrade] ?? [] : []

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade)
    setSelectedDomain('')
    setEntries([emptyEntry()])
  }

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain)
    setEntries([emptyEntry()])
  }

  const updateEntry = (id: number, field: 'code' | 'description', value: string) =>
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, [field]: value } : e))

  const addEntry = () => setEntries((prev) => [...prev, emptyEntry()])

  const removeEntry = (id: number) =>
    setEntries((prev) => prev.filter((e) => e.id !== id))

  // ─── Edit Template view ────────────────────────────────────────────────────

  if (view === 'template' && templateEntry) {
    const codeLabel = templateEntry.code.trim() || 'Domain Code'
    return (
      <Box>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
          <Link component="button" variant="body2" onClick={onBack} underline="hover" color="text.secondary">
            Standards
          </Link>
          <Link component="button" variant="body2" onClick={closeTemplate} underline="hover" color="text.secondary">
            {standardDescription}
          </Link>
          <Link component="button" variant="body2" onClick={closeTemplate} underline="hover" color="text.secondary">
            Grade {selectedGrade}
          </Link>
          <Link component="button" variant="body2" onClick={closeTemplate} underline="hover" color="text.secondary">
            {selectedDomain}
          </Link>
          <Typography variant="body2" color="text.primary" fontWeight={500}>
            {codeLabel}
          </Typography>
        </Breadcrumbs>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight={600}>Edit Template</Typography>
          <Button variant="contained" sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}>
            Save
          </Button>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <Box px={2.5} py={2.5} display="flex" flexDirection="row" gap={6}>
            <Box>
              <Typography variant="caption" color="text.secondary">Domain Code</Typography>
              <Typography variant="body2" fontWeight={600} mt={0.25}>{templateEntry.code || '—'}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Description</Typography>
              <Typography variant="body2" mt={0.25}>{templateEntry.description || '—'}</Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    )
  }

  // ─── Edit Standard view ────────────────────────────────────────────────────

  return (
    <Box>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
        <Link component="button" variant="body2" onClick={onBack} underline="hover" color="text.secondary">
          Standards
        </Link>
        <Typography variant="body2" color="text.primary" fontWeight={500}>
          {standardDescription}
        </Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>Edit Standard</Typography>
        <Button
          variant="contained"
          disabled={!selectedDomain}
          sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}
        >
          Save
        </Button>
      </Box>

      <Card variant="outlined" sx={{ borderRadius: 2, display: 'flex', overflow: 'hidden' }}>

        {/* Column 1 — Grades */}
        <Column title="Grade" subtitle="Select a grade level" width={160}>
          <List disablePadding dense>
            {grades.map((g) => (
              <ListItemButton
                key={g}
                selected={selectedGrade === g}
                onClick={() => handleGradeSelect(g)}
                sx={{
                  px: 2.5,
                  '&.Mui-selected': { bgcolor: '#ede9fb', color: '#6f52dd', fontWeight: 600 },
                  '&.Mui-selected:hover': { bgcolor: '#e0d9f7' },
                }}
              >
                <ListItemText primary={`Grade ${g}`} primaryTypographyProps={{ variant: 'body2' }} />
              </ListItemButton>
            ))}
          </List>
        </Column>

        <Divider orientation="vertical" flexItem />

        {/* Column 2 — Domains */}
        <Column title="Domain" subtitle="Select a domain" disabled={!selectedGrade} width={240}>
          <List disablePadding dense>
            {domains.map((d) => (
              <ListItemButton
                key={d}
                selected={selectedDomain === d}
                onClick={() => handleDomainSelect(d)}
                disabled={!selectedGrade}
                sx={{
                  px: 2.5,
                  '&.Mui-selected': { bgcolor: '#ede9fb', color: '#6f52dd' },
                  '&.Mui-selected:hover': { bgcolor: '#e0d9f7' },
                }}
              >
                <ListItemText primary={d} primaryTypographyProps={{ variant: 'body2' }} />
              </ListItemButton>
            ))}
          </List>
        </Column>

        <Divider orientation="vertical" flexItem />

        {/* Column 3 — Domain Code & Description */}
        <Column title="Domain Code & Description" subtitle="Add one or more code–description pairs" disabled={!selectedDomain}>
          <Box px={2.5} py={2.5} display="flex" flexDirection="column" gap={0}>

            {entries.map((entry, index) => (
              <Box key={entry.id}>
                {index > 0 && <Divider sx={{ my: 2 }} />}

                <Box display="flex" alignItems="flex-start" gap={1}>
                  <Box flex={1} display="flex" flexDirection="column" gap={1.5}>
                    <TextField
                      label="Domain Code"
                      placeholder="e.g. NY-7.RP.1"
                      value={entry.code}
                      onChange={(e) => updateEntry(entry.id, 'code', e.target.value)}
                      disabled={!selectedDomain}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="Description"
                      placeholder="Describe what this domain code covers…"
                      value={entry.description}
                      onChange={(e) => updateEntry(entry.id, 'description', e.target.value)}
                      disabled={!selectedDomain}
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Box>

                  <Box display="flex" flexDirection="column" gap={0.5} mt={0.5}>
                    <Tooltip title="Edit Template">
                      <IconButton
                        size="small"
                        onClick={() => openTemplate(entry)}
                        disabled={!selectedDomain}
                        sx={{ color: 'text.disabled', '&:hover': { color: '#6f52dd' } }}
                      >
                        <Settings fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {entries.length > 1 && (
                      <Tooltip title="Remove">
                        <IconButton
                          size="small"
                          onClick={() => removeEntry(entry.id)}
                          sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}

            <Button
              size="small"
              startIcon={<Add fontSize="small" />}
              onClick={addEntry}
              disabled={!selectedDomain}
              sx={{ mt: 2, alignSelf: 'flex-start', color: '#6f52dd', '&:hover': { bgcolor: '#ede9fb' } }}
            >
              Add Code
            </Button>

          </Box>
        </Column>

      </Card>
    </Box>
  )
}
