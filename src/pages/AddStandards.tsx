import {
  Typography, Box, Button, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, IconButton,
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useState } from 'react'

interface Standard {
  id: number
  description: string
  tags: string[]
}

const initialStandards: Standard[] = [
  { id: 1, description: 'New York State Mathematics Learning Standards (NY-MLS)', tags: ['Math', 'New York'] },
  { id: 2, description: 'Common Core State Standards for Mathematics (CCSS-M)', tags: ['Math', 'Common Core', 'National'] },
  { id: 4, description: 'Tennessee Essential Knowledge and Skills (TEKS) – Mathematics', tags: ['Math', 'Tennessee'] },
]

export default function AddStandards() {
  const [standards, setStandards] = useState<Standard[]>(initialStandards)

  const handleDelete = (id: number) => {
    setStandards((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>Standards</Typography>
          <Typography variant="body1" color="text.secondary">
            Manage curriculum standards aligned to your tools.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Standard
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={600}>Description</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Tags</Typography></TableCell>
              <TableCell align="right"><Typography fontWeight={600}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standards.map((standard) => (
              <TableRow key={standard.id} hover>
                <TableCell>{standard.description}</TableCell>
                <TableCell>
                  <Stack direction="row" gap={0.5} flexWrap="wrap">
                    {standard.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
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
            {standards.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography color="text.secondary" py={3}>No standards yet. Click "Add Standard" to get started.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
