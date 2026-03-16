import {
  Typography, Box, Card, CardContent, Grid, Button,
  LinearProgress, Table, TableBody, TableCell, TableHead,
  TableRow, Chip, Divider,
} from '@mui/material'
import {
  AddCircleOutline, Calculate, Rule, Build,
  TrendingUp, School, Groups, MenuBook,
  ArrowForward, LightbulbOutlined, WarningAmber,
  CheckCircleOutline, AutoStories,
} from '@mui/icons-material'

// ─── Data ─────────────────────────────────────────────────────────────────────

const metrics = [
  { label: 'Tools Created', value: 24, icon: <MenuBook sx={{ fontSize: 20 }} />, color: '#6f52dd', bg: '#ede9fb' },
  { label: 'Sources Uploaded', value: 38, icon: <Build sx={{ fontSize: 20 }} />, color: '#1565c0', bg: '#e3f0fb' },
  { label: 'Standards Covered', value: 17, icon: <Rule sx={{ fontSize: 20 }} />, color: '#2e7d32', bg: '#e6f4e7' },
  { label: 'Students Impacted', value: 312, icon: <Groups sx={{ fontSize: 20 }} />, color: '#e65100', bg: '#fff3e0' },
]

const quickActions = [
  {
    icon: <AddCircleOutline sx={{ fontSize: 28 }} />,
    title: 'Create New Lesson',
    description: 'Generate a culturally relevant math lesson aligned with standards.',
    color: '#6f52dd', bg: '#ede9fb',
  },
  {
    icon: <Calculate sx={{ fontSize: 28 }} />,
    title: 'Generate Math Problems',
    description: 'Create differentiated problem sets for any grade level.',
    color: '#1565c0', bg: '#e3f0fb',
  },
  {
    icon: <Rule sx={{ fontSize: 28 }} />,
    title: 'Browse Standards',
    description: 'Explore CCSS, TEKS, and other frameworks by domain.',
    color: '#2e7d32', bg: '#e6f4e7',
  },
  {
    icon: <Build sx={{ fontSize: 28 }} />,
    title: 'Create Teaching Tool',
    description: 'Build exit tickets, warm-ups, assessments, and more.',
    color: '#e65100', bg: '#fff3e0',
  },
]

const recentLessons = [
  { title: 'Multiplication with Luke Cage', standard: 'CCSS 3.OA', date: 'Today', status: 'Published' },
  { title: 'Fractions in Cooking', standard: 'CCSS 4.NF', date: 'Yesterday', status: 'Published' },
  { title: 'Geometry in Basketball', standard: 'CCSS 5.G', date: '3 days ago', status: 'Draft' },
  { title: 'Division Strategies', standard: 'CCSS 3.OA', date: '4 days ago', status: 'Published' },
  { title: 'Place Value with Money', standard: 'CCSS 2.NBT', date: '5 days ago', status: 'Draft' },
]

const standardsCoverage = [
  { standard: 'CCSS.MATH.3.OA', label: 'Operations & Algebraic Thinking', pct: 82 },
  { standard: 'CCSS.MATH.4.NF', label: 'Number & Fractions', pct: 55 },
  { standard: 'CCSS.MATH.5.G', label: 'Geometry', pct: 38 },
  { standard: 'CCSS.MATH.2.NBT', label: 'Number & Base Ten', pct: 70 },
]

const suggestedTools = [
  {
    icon: <AutoStories sx={{ fontSize: 24 }} />,
    name: 'Math Spiral Review',
    description: 'Daily review covering multiple standards to reinforce prior learning.',
    color: '#6f52dd', bg: '#ede9fb',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 24 }} />,
    name: 'Real World Math Problems',
    description: 'Contextual problems connecting math to students\' everyday lives.',
    color: '#1565c0', bg: '#e3f0fb',
  },
  {
    icon: <School sx={{ fontSize: 24 }} />,
    name: 'Common Misconceptions',
    description: 'Targeted activities to address and correct frequent student errors.',
    color: '#2e7d32', bg: '#e6f4e7',
  },
]

const difficulties = [
  'Fraction equivalence',
  'Multi-step word problems',
  'Area vs. perimeter',
]

const reinforcements = [
  'Visual fraction models',
  'Array multiplication',
  'Real world geometry examples',
]

const weeklyData = [
  { day: 'Mon', count: 3 },
  { day: 'Tue', count: 5 },
  { day: 'Wed', count: 2 },
  { day: 'Thu', count: 8 },
  { day: 'Fri', count: 4 },
  { day: 'Sat', count: 1 },
  { day: 'Sun', count: 2 },
]

const MAX_BAR = Math.max(...weeklyData.map((d) => d.count))

// ─── Component ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <Box>

      {/* 1. Welcome Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Hello 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Let's create something meaningful for your students today.
        </Typography>
      </Box>

      {/* 2. Quick Actions */}
      {/* <Typography variant="overline" color="text.disabled" fontWeight={600} letterSpacing={1.2}>
        Quick Actions
      </Typography>
      <Grid container spacing={2} mt={0} mb={4}>
        {quickActions.map((action) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={action.title}>
            <Card
              variant="outlined"
              sx={{
                height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                transition: '0.15s', borderRadius: 2,
                '&:hover': { borderColor: action.color, boxShadow: `0 0 0 1px ${action.color}22, 0 4px 16px ${action.color}18` },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: action.bg, color: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
                >
                  {action.icon}
                </Box>
                <Typography fontWeight={600} mb={0.5}>{action.title}</Typography>
                <Typography variant="body2" color="text.secondary">{action.description}</Typography>
              </CardContent>
              <Box px={2} pb={2}>
                <Button
                  size="small"
                  endIcon={<ArrowForward fontSize="small" />}
                  sx={{ color: action.color, px: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                >
                  Get started
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid> */}

      {/* 3. Metrics */}
      <Typography variant="overline" color="text.disabled" fontWeight={600} letterSpacing={1.2}>
        Overview
      </Typography>
      <Grid container spacing={2} mt={0} mb={4}>
        {metrics.map((m) => (
          <Grid size={{ xs: 6, md: 3 }} key={m.label}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">{m.label}</Typography>
                  <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.icon}
                  </Box>
                </Box>
                <Typography variant="h4" fontWeight={700} color={m.color}>{m.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 4 + 5. Recent Lessons & Standards Coverage */}
      <Grid container spacing={2} mb={4}>

        {/* Recent Lessons */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography fontWeight={600}>Recent Lessons</Typography>
                <Button size="small" endIcon={<ArrowForward fontSize="small" />} sx={{ color: '#6f52dd' }}>
                  View All
                </Button>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 12 }}>LESSON TITLE</TableCell>
                    <TableCell sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 12 }}>STANDARD</TableCell>
                    <TableCell sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 12 }}>CREATED</TableCell>
                    <TableCell sx={{ color: 'text.disabled', fontWeight: 600, fontSize: 12 }}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentLessons.map((lesson) => (
                    <TableRow key={lesson.title} hover sx={{ cursor: 'pointer' }}>
                      <TableCell sx={{ fontSize: 13, fontWeight: 500 }}>{lesson.title}</TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ bgcolor: '#ede9fb', color: '#6f52dd', px: 1, py: 0.3, borderRadius: 1, fontWeight: 600 }}>
                          {lesson.standard}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>{lesson.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={lesson.status}
                          size="small"
                          color={lesson.status === 'Published' ? 'success' : 'default'}
                          sx={{ fontSize: 11 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Standards Coverage */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography fontWeight={600} mb={0.5}>Standards Coverage This Month</Typography>
              <Typography variant="body2" color="text.secondary" mb={2.5}>Tracking your alignment across domains</Typography>

              <Box mb={3}>
                {standardsCoverage.map((s) => (
                  <Box key={s.standard} mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Box>
                        <Typography variant="caption" fontWeight={700} color="#6f52dd">{s.standard}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block">{s.label}</Typography>
                      </Box>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">{s.pct}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={s.pct}
                      sx={{
                        height: 6, borderRadius: 3, bgcolor: '#ede9fb',
                        '& .MuiLinearProgress-bar': { bgcolor: '#6f52dd', borderRadius: 3 },
                      }}
                    />
                  </Box>
                ))}
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* 7 + 8. Teaching Insights & Weekly Activity */}
      <Grid container spacing={2}>

        {/* Teaching Insights */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <LightbulbOutlined sx={{ color: '#6f52dd', fontSize: 20 }} />
                <Typography fontWeight={600}>Teaching Insights</Typography>
                <Typography variant="caption" sx={{ ml: 'auto', bgcolor: '#ede9fb', color: '#6f52dd', px: 1, py: 0.3, borderRadius: 1, fontWeight: 600 }}>
                  AI Generated
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ bgcolor: '#fff8f0', border: '1px solid #ffe0b2', borderRadius: 2, p: 2 }}>
                    <Box display="flex" alignItems="center" gap={0.8} mb={1.5}>
                      <WarningAmber sx={{ fontSize: 16, color: '#e65100' }} />
                      <Typography variant="body2" fontWeight={600} color="#e65100">Common Difficulties</Typography>
                    </Box>
                    {difficulties.map((d) => (
                      <Box key={d} display="flex" alignItems="center" gap={1} mb={0.8}>
                        <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#e65100', flexShrink: 0 }} />
                        <Typography variant="body2">{d}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ bgcolor: '#f0faf2', border: '1px solid #c8e6c9', borderRadius: 2, p: 2 }}>
                    <Box display="flex" alignItems="center" gap={0.8} mb={1.5}>
                      <CheckCircleOutline sx={{ fontSize: 16, color: '#2e7d32' }} />
                      <Typography variant="body2" fontWeight={600} color="#2e7d32">Suggested Reinforcement</Typography>
                    </Box>
                    {reinforcements.map((r) => (
                      <Box key={r} display="flex" alignItems="center" gap={1} mb={0.8}>
                        <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#2e7d32', flexShrink: 0 }} />
                        <Typography variant="body2">{r}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Activity */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography fontWeight={600} mb={0.5}>Weekly Activity</Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>Lessons generated this week</Typography>

              <Box display="flex" alignItems="flex-end" gap={1.5} height={120} px={1}>
                {weeklyData.map((d) => (
                  <Box key={d.day} display="flex" flexDirection="column" alignItems="center" flex={1} gap={0.5}>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                      {d.count > 0 ? d.count : ''}
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: MAX_BAR > 0 ? `${(d.count / MAX_BAR) * 88}px` : '4px',
                        bgcolor: d.count > 0 ? '#6f52dd' : '#ede9fb',
                        borderRadius: '4px 4px 2px 2px',
                        minHeight: 4,
                        transition: '0.2s',
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">{d.day}</Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" color="text.secondary">This week</Typography>
                  <Typography fontWeight={700} color="#6f52dd">{weeklyData.reduce((s, d) => s + d.count, 0)} lessons</Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="caption" color="text.secondary">Best day</Typography>
                  <Typography fontWeight={700} color="#6f52dd">
                    {weeklyData.find((d) => d.count === MAX_BAR)?.day} ({MAX_BAR})
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Box>
  )
}
