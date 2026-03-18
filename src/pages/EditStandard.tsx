import { Box, Typography, Breadcrumbs, Link, Card, TextField, Divider, List, ListItemButton, ListItemText } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'
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

export default function EditStandard({ standardDescription, onBack }: EditStandardProps) {
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('')
  const [domainCode, setDomainCode] = useState('')
  const [domainDescription, setDomainDescription] = useState('')

  const domains = selectedGrade ? gradeDomainMap[selectedGrade] ?? [] : []

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade)
    setSelectedDomain('')
    setDomainCode('')
    setDomainDescription('')
  }

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain)
    setDomainCode('')
    setDomainDescription('')
  }

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

      <Typography variant="h4" fontWeight={600} mb={3}>Edit Standard</Typography>

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
        <Column title="Domain Code & Description" subtitle="Enter the code and description" disabled={!selectedDomain}>
          <Box px={2.5} py={2.5} display="flex" flexDirection="column" gap={2.5}>
            <TextField
              label="Domain Code"
              placeholder="e.g. NY-7.RP.1"
              value={domainCode}
              onChange={(e) => setDomainCode(e.target.value)}
              disabled={!selectedDomain}
              size="small"
              fullWidth
            />
            <TextField
              label="Description"
              placeholder="Describe what this domain code covers…"
              value={domainDescription}
              onChange={(e) => setDomainDescription(e.target.value)}
              disabled={!selectedDomain}
              size="small"
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </Column>

      </Card>
    </Box>
  )
}
