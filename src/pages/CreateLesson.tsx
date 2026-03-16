import {
  Typography, Box, Card, CardContent, TextField, MenuItem,
  Autocomplete, Chip, Button, Divider,
} from '@mui/material'
import { AutoAwesome } from '@mui/icons-material'
import { useState } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const formats = ['Lesson', 'Activity', 'Problem Set', 'Warm-Up', 'Exit Ticket', 'Assessment']

const domains = [
  'Ratios & Proportional Relationships',
  'The Number System',
  'Expressions & Equations',
  'Geometry',
  'Statistics & Probability',
]

const standardOptions = [
  'NY-7.RP.1 – Compute unit rates associated with ratios of fractions, including ratios of lengths, areas, and other quantities measured in like or different units.',
  'NY-7.RP.2 – Recognize and represent proportional relationships between quantities.',
  'NY-7.NS.1 – Apply and extend previous understandings of addition and subtraction to add and subtract rational numbers.',
  'NY-7.NS.2 – Apply and extend previous understandings of multiplication and division of fractions.',
  'NY-7.EE.1 – Apply properties of operations to add, subtract, factor, and expand linear expressions with rational coefficients.',
  'NY-7.EE.2 – Understand that rewriting an expression in different forms in real-world and mathematical problems can reveal and explain how the quantities are related. For example, a + 0.05a and 1.05a are equivalent expressions meaning that "increase by 5%" is the same as "multiply by 1.05."',
  'NY-7.EE.3 – Solve multi-step real-life and mathematical problems posed with positive and negative rational numbers in any form.',
  'NY-7.G.1 – Solve problems involving scale drawings of geometric figures.',
  'NY-7.G.2 – Draw geometric shapes with given conditions, including triangles.',
  'NY-7.SP.1 – Understand that statistics can be used to gain information about a population by examining a sample of the population.',
  'NY-7.SP.2 – Use data from a random sample to draw inferences about a population.',
]

const topicCategories = ['People', 'Places & Events', 'Culture']

const subcategoryMap: Record<string, string[]> = {
  'Culture': ['Art', 'Cuisine', 'Dance', 'Film', 'Music', 'Traditions & Holidays'],
  'Places & Events': ['African Diaspora', 'History of Africa', 'U.S. Black History'],
  'People': [],
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateLesson() {
  const [grade, setGrade] = useState('')
  const [format, setFormat] = useState('')
  const [domain, setDomain] = useState('')
  const [standards, setStandards] = useState<string[]>([])
  const [topicCategory, setTopicCategory] = useState('')
  const [topicSubcategory, setTopicSubcategory] = useState('')

  const subcategories = topicCategory ? subcategoryMap[topicCategory] ?? [] : []

  const handleCategoryChange = (value: string) => {
    setTopicCategory(value)
    setTopicSubcategory('')
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={600} gutterBottom>Create New Tool</Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your lesson settings and generate a culturally relevant math tool.
        </Typography>
      </Box>

      {/* Two-column layout */}
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} alignItems="start">

        {/* Left card — reserved for future functionality */}
        <Card variant="outlined" sx={{ borderRadius: 2, minHeight: 520 }}>
          <CardContent sx={{ height: '100%' }} />
        </Card>

        {/* Right card — configuration form */}
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography fontWeight={600} mb={0.5}>Lesson Configuration</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Fill in the details below to generate your tool.
            </Typography>

            <Box display="flex" flexDirection="column" gap={2.5}>

              {/* Grade Level */}
              <TextField
                select
                label="Grade Level"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                fullWidth
                size="small"
              >
                {grades.map((g) => (
                  <MenuItem key={g} value={g}>Grade {g}</MenuItem>
                ))}
              </TextField>

              {/* Format */}
              <TextField
                select
                label="Format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                fullWidth
                size="small"
              >
                {formats.map((f) => (
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                ))}
              </TextField>

              {/* Domain */}
              <TextField
                select
                label="Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                fullWidth
                size="small"
              >
                {domains.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>

              {/* Standards */}
              <Autocomplete
                multiple
                options={standardOptions}
                value={standards}
                onChange={(_, value) => setStandards(value)}
                disableCloseOnSelect
                size="small"
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const code = option.split(' – ')[0]
                    return (
                      <Chip
                        label={code}
                        size="small"
                        {...getTagProps({ index })}
                        sx={{ bgcolor: '#ede9fb', color: '#6f52dd', fontWeight: 600 }}
                      />
                    )
                  })
                }
                renderOption={(props, option) => {
                  const [code, ...rest] = option.split(' – ')
                  return (
                    <Box component="li" {...props} sx={{ flexDirection: 'column', alignItems: 'flex-start !important', py: 1.5 }}>
                      <Typography variant="body2" fontWeight={600} color="#6f52dd">{code}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3 }}>
                        {rest.join(' – ')}
                      </Typography>
                    </Box>
                  )
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Standards" placeholder={standards.length === 0 ? 'Search or select standards…' : ''} />
                )}
              />

              <Divider />

              {/* Topic Category */}
              <TextField
                select
                label="Topic Category"
                value={topicCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                fullWidth
                size="small"
              >
                {topicCategories.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>

              {/* Topic Subcategory */}
              <TextField
                select
                label="Topic Subcategory"
                value={topicSubcategory}
                onChange={(e) => setTopicSubcategory(e.target.value)}
                fullWidth
                size="small"
                disabled={!topicCategory || subcategories.length === 0}
                helperText={topicCategory && subcategories.length === 0 ? 'No subcategories available for this category.' : ''}
              >
                {subcategories.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>

            </Box>

            {/* Generate button */}
            <Box mt={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<AutoAwesome />}
                sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' }, borderRadius: 2, py: 1.2 }}
              >
                Generate Tool
              </Button>
            </Box>
          </CardContent>
        </Card>

      </Box>
    </Box>
  )
}
