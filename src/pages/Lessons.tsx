import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Paper,
} from '@mui/material'

const lessons = [
  { title: 'Introduction to Algebra', subject: 'Math', status: 'Published' },
  { title: 'The Water Cycle', subject: 'Science', status: 'Draft' },
  { title: 'World War II Overview', subject: 'History', status: 'Published' },
  { title: 'Reading Comprehension Basics', subject: 'English', status: 'Published' },
  { title: 'Introduction to Python', subject: 'CS', status: 'Draft' },
]

export default function Lessons() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Lessons
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Browse and manage your lesson library.
      </Typography>
      <Paper>
        <List disablePadding>
          {lessons.map((lesson, i) => (
            <ListItem key={i} divider={i < lessons.length - 1} sx={{ py: 1.5 }}>
              <ListItemText
                primary={lesson.title}
                secondary={lesson.subject}
              />
              <ListItemSecondaryAction>
                <Chip
                  label={lesson.status}
                  size="small"
                  color={lesson.status === 'Published' ? 'success' : 'default'}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
