import { Typography, Box, Paper, Avatar, TextField, Button, Divider, MenuItem, Chip, Stack } from '@mui/material'
import { useState } from 'react'

const roles = ['Teacher', 'Administrator', 'Curriculum Coordinator', 'Instructional Coach', 'Other']

const usStates = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
]

const standards = ['Common Core', 'NGSS', 'TEKS', 'Virginia SOL', 'Custom']
const grades = ['K','1','2','3','4','5','6','7','8','9','10','11','12']
const subjects = ['Math','ELA','Science','Social Studies','Art','Music','Physical Education','Foreign Language','Technology','Special Education']

const col3 = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }
const col2 = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }

export default function Profile() {
  const [selectedGrades, setSelectedGrades] = useState<string[]>(['5'])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Math'])

  const toggleGrade = (g: string) =>
    setSelectedGrades((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g])

  const toggleSubject = (s: string) =>
    setSelectedSubjects((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>Profile</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Manage your personal information and account details.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Avatar */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 64, height: 64, fontSize: 26 }}>T</Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>Alice Johnson</Typography>
              <Typography variant="body2" color="text.secondary">aliceJohnson@school.edu</Typography>
              <Button size="small" sx={{ mt: 0.5, pl: 0 }}>Change photo</Button>
            </Box>
          </Box>

          <Divider />

          {/* Row 1: First Name, Last Name, Email */}
          <Box sx={col3}>
            <TextField label="First Name" defaultValue="Alice" fullWidth />
            <TextField label="Last Name" defaultValue="Johnson" fullWidth />
            <TextField label="Email" defaultValue="aliceJohnson@school.edu" fullWidth />
          </Box>

          {/* Row 2: Role, State, Standard */}
          <Box sx={col3}>
            <TextField label="Role" select defaultValue="Teacher" fullWidth>
              {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </TextField>
            <TextField label="State" select defaultValue="California" fullWidth>
              {usStates.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField label="Standard" select defaultValue="Common Core" fullWidth>
              {standards.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Box>

          {/* Row 3: School District, School */}
          <Box sx={col2}>
            <TextField label="School District" defaultValue="Springfield Unified School District" fullWidth />
            <TextField label="School" defaultValue="Springfield Elementary" fullWidth />
          </Box>

          {/* Row 4: Grades + Subjects side by side */}
          <Box sx={col2}>
            <Box>
              <Typography variant="body2" fontWeight={600} mb={1}>Grade(s) Taught</Typography>
              <Stack direction="row" gap={0.5} flexWrap="wrap">
                {grades.map((g) => (
                  <Chip
                    key={g}
                    label={g}
                    size="small"
                    onClick={() => toggleGrade(g)}
                    color={selectedGrades.includes(g) ? 'primary' : 'default'}
                    variant={selectedGrades.includes(g) ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={600} mb={1}>Subject(s) Taught</Typography>
              <Stack direction="row" gap={0.5} flexWrap="wrap">
                {subjects.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    size="small"
                    onClick={() => toggleSubject(s)}
                    color={selectedSubjects.includes(s) ? 'primary' : 'default'}
                    variant={selectedSubjects.includes(s) ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>

          <Box>
            <Button variant="contained">Save Changes</Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
