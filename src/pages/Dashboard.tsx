import { Typography, Grid, Card, CardContent, Box } from '@mui/material'
import { MenuBook, People, Quiz, TrendingUp } from '@mui/icons-material'

const stats = [
  { label: 'Total Lessons', value: 24, icon: <MenuBook fontSize="large" color="primary" /> },
  { label: 'Students', value: 138, icon: <People fontSize="large" color="secondary" /> },
  { label: 'Quizzes', value: 12, icon: <Quiz fontSize="large" color="success" /> },
  { label: 'Avg. Score', value: '87%', icon: <TrendingUp fontSize="large" color="warning" /> },
]

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome back! Here's an overview of your lesson activity.
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
