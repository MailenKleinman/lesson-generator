import { Typography, Grid, Card, CardContent, Box, Button } from '@mui/material'
import {
  MenuBook, People, Quiz, TrendingUp,
  Calculate, AutoStories, Science, Public,
  Brush, MusicNote, FitnessCenter, Computer, Translate, Diversity3,
} from '@mui/icons-material'
import type { ReactNode } from 'react'

interface Subject {
  name: string
  description: string
  icon: ReactNode
  color: string
  bg: string
}

const subjects: Subject[] = [
  { name: 'Math', description: 'Algebra, geometry, word problems, and more.', icon: <Calculate sx={{ fontSize: 36 }} />, color: '#6f52dd', bg: '#ede9fb' },
  { name: 'ELA', description: 'Reading comprehension, writing prompts, vocabulary, and grammar.', icon: <AutoStories sx={{ fontSize: 36 }} />, color: '#1976d2', bg: '#e3f0fb' },
  { name: 'Science', description: 'NGSS-aligned labs, experiments, and concept builders.', icon: <Science sx={{ fontSize: 36 }} />, color: '#2e7d32', bg: '#e6f4e7' },
  { name: 'Social Studies', description: 'History, geography, civics, and current events tools.', icon: <Public sx={{ fontSize: 36 }} />, color: '#a30ba5ff', bg: '#f1e0f2ff' },
  { name: 'Art', description: 'Creative projects, art history, and visual literacy activities.', icon: <Brush sx={{ fontSize: 36 }} />, color: '#ad1457', bg: '#fce4ec' },
  { name: 'Technology', description: 'Coding, digital literacy, and computer science tools.', icon: <Computer sx={{ fontSize: 36 }} />, color: '#43a4d8ff', bg: '#e1f5fe' },
  { name: 'Foreign Language', description: 'Vocabulary, conversation, and grammar practice tools.', icon: <Translate sx={{ fontSize: 36 }} />, color: '#088187ff', bg: '#e0f2f1' },
  { name: 'Special Education', description: 'Differentiated materials and accommodations support.', icon: <Diversity3 sx={{ fontSize: 36 }} />, color: '#c01b1bff', bg: '#ffe0e0ff' },
]

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>Dashboard</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Select a subject below to explore tools and generate content.
      </Typography>

      {/* Subject cards */}
      <Grid container spacing={2}>
        {subjects.map((subject) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={subject.name}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: '0.2s',
              '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: subject.bg, color: subject.color, mb: 2 }}
                >
                  {subject.icon}
                </Box>
                <Typography fontWeight={700} fontSize={16} mb={0.5}>{subject.name}</Typography>
                <Typography variant="body2" color="text.secondary">{subject.description}</Typography>
              </CardContent>
              <Box px={2} pb={2}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: subject.color, '&:hover': { bgcolor: subject.color, opacity: 0.9 } }}
                >
                  Create
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
