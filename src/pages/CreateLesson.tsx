import {
  Typography, Box, Card, CardContent, TextField, MenuItem,
  Button, Divider, RadioGroup, FormControlLabel, IconButton,
  Radio, FormControl, FormLabel, Dialog, DialogTitle,
  DialogContent, DialogActions, Tooltip, Checkbox, Slider,
  Switch, FormGroup, InputAdornment,
} from '@mui/material'
import {
  FormatBold, FormatItalic, FormatUnderlined, FormatStrikethrough,
  FormatListBulleted, FormatListNumbered, FormatAlignLeft,
  FormatAlignCenter, FormatAlignRight, FormatColorText,
  FormatColorFill, Undo, Redo, AutoAwesome as AutoAwesomeIcon,
  UploadFile, Tune, History, Publish, Send, Save,
} from '@mui/icons-material'
import { useState, useRef } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const formats = ['Lesson', 'Task', 'Problem Set', 'Warm-Up', 'Assessment']

const domains = [
  'Ratios & Proportional Relationships',
  'The Number System',
  'Expressions & Equations',
  'Geometry',
  'Statistics & Probability',
]

interface DomainCode { code: string; description: string }

const domainCodeMap: Record<string, DomainCode[]> = {
  'Ratios & Proportional Relationships': [
    { code: 'NY-7.RP.1', description: 'Compute unit rates associated with ratios of fractions.' },
    { code: 'NY-7.RP.2', description: 'Recognize and represent proportional relationships between quantities.' },
    { code: 'NY-7.RP.3', description: 'Use proportional relationships to solve multi-step ratio and percent problems.' },
  ],
  'The Number System': [
    { code: 'NY-7.NS.1', description: 'Apply and extend previous understandings of addition and subtraction to add and subtract rational numbers.' },
    { code: 'NY-7.NS.2', description: 'Apply and extend previous understandings of multiplication and division of fractions.' },
    { code: 'NY-7.NS.3', description: 'Solve real-world and mathematical problems involving the four operations with rational numbers.' },
  ],
  'Expressions & Equations': [
    { code: 'NY-7.EE.1', description: 'Apply properties of operations to add, subtract, factor, and expand linear expressions with rational coefficients.' },
    { code: 'NY-7.EE.2', description: 'Understand that rewriting an expression in different forms can reveal how quantities are related.' },
    { code: 'NY-7.EE.3', description: 'Solve multi-step real-life problems posed with positive and negative rational numbers.' },
    { code: 'NY-7.EE.4', description: 'Use variables to represent quantities and construct equations or inequalities to solve problems.' },
  ],
  'Geometry': [
    { code: 'NY-7.G.1', description: 'Solve problems involving scale drawings of geometric figures.' },
    { code: 'NY-7.G.2', description: 'Draw geometric shapes with given conditions, including triangles.' },
    { code: 'NY-7.G.3', description: 'Describe the cross-sections of three-dimensional figures.' },
    { code: 'NY-7.G.4', description: 'Know and use the formulas for area and circumference of a circle.' },
    { code: 'NY-7.G.5', description: 'Use facts about supplementary, complementary, vertical, and adjacent angles.' },
    { code: 'NY-7.G.6', description: 'Solve real-world problems involving area, surface area, and volume.' },
  ],
  'Statistics & Probability': [
    { code: 'NY-7.SP.1', description: 'Understand that statistics can be used to gain information about a population by examining a sample.' },
    { code: 'NY-7.SP.2', description: 'Use data from a random sample to draw inferences about a population.' },
    { code: 'NY-7.SP.3', description: 'Informally assess the degree of visual overlap of two numerical data distributions.' },
    { code: 'NY-7.SP.4', description: 'Use measures of center and variability to compare two populations.' },
    { code: 'NY-7.SP.5', description: 'Understand that the probability of a chance event is a number between 0 and 1.' },
    { code: 'NY-7.SP.6', description: 'Approximate the probability of an event by collecting data and observing its long-run frequency.' },
    { code: 'NY-7.SP.7', description: 'Develop a probability model and use it to find probabilities of events.' },
    { code: 'NY-7.SP.8', description: 'Find probabilities of compound events using organized lists, tables, and tree diagrams.' },
  ],
}

const standardFrameworks = [
  'New York State Mathematics Learning Standards (NY-MLS)',
  'Common Core State Standards for Mathematics (CCSS-M)',
  'Tennessee Essential Knowledge and Skills (TEKS) – Mathematics',
]

const topicCategories = ['People', 'Places & Events', 'Culture']

const topicOptionsMap: Record<string, string[]> = {
  // People
  'Athletes': ['Michael Jordan', 'Serena Williams', 'Usain Bolt', 'Simone Biles', 'LeBron James', 'Jackie Robinson', 'Muhammad Ali', 'Megan Rapinoe'],
  'Activists': ['Martin Luther King Jr.', 'Rosa Parks', 'Malcolm X', 'Harriet Tubman', 'Angela Davis', 'John Lewis', 'Fannie Lou Hamer'],
  'Authors': ['Maya Angelou', 'Langston Hughes', 'Toni Morrison', 'James Baldwin', 'Zora Neale Hurston', 'Walter Dean Myers'],
  'Characters': ['Luke Cage', 'Black Panther', 'Miles Morales', 'Storm', 'Static Shock', 'Shuri'],
  'Entertainers': ['Beyoncé', 'Tupac Shakur', 'Nina Simone', 'Prince', 'Josephine Baker'],
  'Entrepreneurs': ['Madam C.J. Walker', 'Robert F. Smith', 'Oprah Winfrey', 'Daymond John'],
  'Inventors': ['Lewis Howard Latimer', 'Garrett Morgan', 'Granville T. Woods', 'Patricia Bath', 'Charles Drew'],
  'Politicians': ['Barack Obama', 'Shirley Chisholm', 'Kamala Harris', 'John Lewis', 'Thurgood Marshall'],
  'Scholars': ['W.E.B. Du Bois', 'Frederick Douglass', 'bell hooks', 'Cornel West', 'Henry Louis Gates Jr.'],
  'Scientists & Mathematicians': ['Katherine Johnson', 'Mae Jemison', 'Neil deGrasse Tyson', 'Hidden Figures', 'Benjamin Banneker', 'Charles Henry Turner'],
  // Culture
  'Art': ['Adinkra Symbols', 'Harlem Renaissance', 'African Masks', 'Street Art & Graffiti', 'Quilting Traditions'],
  'Cuisine': ['Soul Food', 'Caribbean Cuisine', 'West African Dishes', 'Juneteenth Foods'],
  'Dance': ['Double Dutch', 'Stepping', 'Hip-Hop Dance', 'Lindy Hop'],
  'Film': ['Black Panther', 'Hidden Figures', 'Selma', 'Do the Right Thing', 'Moonlight'],
  'Music': ['Hip-Hop Origins', 'Jazz History', 'Blues', 'Gospel', 'Afrobeats'],
  'Traditions & Holidays': ['Kwanzaa', 'Juneteenth'],
  // Places & Events
  'African Diaspora': ['Caribbean Islands', 'Brazil', 'New Orleans', 'Harlem'],
  'History of Africa': ['Ancient Egypt', 'Mali Empire', 'Kingdom of Kush', 'Great Zimbabwe', 'Timbuktu'],
  'U.S. Black History': ['Reconstruction Era', 'Civil Rights Movement', 'Harlem Renaissance', 'Black Wall Street'],
}

const subcategoryMap: Record<string, string[]> = {
  'Culture': ['Art', 'Cuisine', 'Dance', 'Film', 'Music', 'Traditions & Holidays'],
  'Places & Events': ['African Diaspora', 'History of Africa', 'U.S. Black History'],
  'People': ['Activists', 'Athletes', 'Authors', 'Characters', 'Entertainers', 'Entrepreneurs', 'Inventors', 'Politicians', 'Scholars', 'Scientists & Mathematicians'],
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateLesson() {
  const [toolMode, setToolMode] = useState<'create' | 'adapt'>('create')

  const [grade, setGrade] = useState('')
  const [format, setFormat] = useState('')
  const [standardFramework, setStandardFramework] = useState('')
  const [domain, setDomain] = useState('')
  const [domainCode, setDomainCode] = useState('')
  const [topicMode, setTopicMode] = useState<'own' | 'recommended'>('recommended')
  const [customTopic, setCustomTopic] = useState('')
  const [topicCategory, setTopicCategory] = useState('')
  const [topicSubcategory, setTopicSubcategory] = useState('')
  const [specificTopic, setSpecificTopic] = useState('')

  const editorRef = useRef<HTMLDivElement>(null)
  const [editorEmpty, setEditorEmpty] = useState(true)
  const exec = (command: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
  }

  const [advancedOpen, setAdvancedOpen] = useState(false)

  // Classroom information
  const [studentCount, setStudentCount] = useState('')
  const [ethnicity, setEthnicity] = useState<string[]>([])
  const [classroomTraits, setClassroomTraits] = useState<string[]>([])
  const toggleTrait = (trait: string) =>
    setClassroomTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    )
  const [classroomContext, setClassroomContext] = useState('')

  // Lesson sections
  const [selectedSections, setSelectedSections] = useState<string[]>([
    'Teacher Preparation', 'Learning Overview', 'Objective and Learning Outcomes',
    'Story/Narrative', 'Math Tasks', 'End Discussion',
  ])
  const toggleSection = (section: string) =>
    setSelectedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  // Practice configuration
  const [exerciseCount, setExerciseCount] = useState(5)
  const [includeGraphics, setIncludeGraphics] = useState(false)
  const [applyGleam, setApplyGleam] = useState(false)
  const [difficulty, setDifficulty] = useState('Medium')
  const [exerciseTypes, setExerciseTypes] = useState<string[]>(['Word Problems'])
  const toggleExerciseType = (type: string) =>
    setExerciseTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  const [scaffolding, setScaffolding] = useState(false)
  const [realWorldContext, setRealWorldContext] = useState(false)

  const handleFrameworkChange = (value: string) => {
    setStandardFramework(value)
    setDomain('')
    setDomainCode('')
  }

  const subcategories = topicCategory ? subcategoryMap[topicCategory] ?? [] : []
  const specificTopics = topicSubcategory ? topicOptionsMap[topicSubcategory] ?? [] : []

  const canGenerate = Boolean(
    standardFramework && grade && domain && domainCode &&
    (topicMode === 'own' ? customTopic.trim() : topicCategory && topicSubcategory && specificTopic)
  )

  const handleCategoryChange = (value: string) => {
    setTopicCategory(value)
    setTopicSubcategory('')
    setSpecificTopic('')
  }

  const handleTopicModeChange = (value: 'own' | 'recommended') => {
    setTopicMode(value)
    setCustomTopic('')
    setTopicCategory('')
    setTopicSubcategory('')
    setSpecificTopic('')
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={600} gutterBottom>Create New Tool</Typography>
      </Box>

      {/* Two-column layout */}
      <Box display="grid" gridTemplateColumns="1fr 2fr" gap={3} alignItems="stretch">

        {/* Right card — configuration form */}
        <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
          <CardContent>
            <Typography fontWeight={600} mb={2}>Tool Configuration</Typography>

            {/* Mode selector */}
            <FormControl sx={{ mb: 2 }}>
              <RadioGroup
                row
                value={toolMode}
                onChange={(e) => setToolMode(e.target.value as 'create' | 'adapt')}
              >
                <FormControlLabel
                  value="create"
                  control={<Radio size="small" sx={{ color: '#6f52dd', '&.Mui-checked': { color: '#6f52dd' } }} />}
                  label={<Typography variant="body2" fontWeight={500}>Create New Tool</Typography>}
                />
                <FormControlLabel
                  value="adapt"
                  control={<Radio size="small" sx={{ color: '#6f52dd', '&.Mui-checked': { color: '#6f52dd' } }} />}
                  label={<Typography variant="body2" fontWeight={500}>Adapt Existing Tool</Typography>}
                />
              </RadioGroup>
            </FormControl>

            {/* Adapt mode — upload box */}
            {toolMode === 'adapt' && (
              <Box
                component="label"
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 0.25, py: 3, px: 2, cursor: 'pointer', borderRadius: 2, mb: 2,
                  border: '2px dashed', borderColor: '#b39ddb',
                  color: '#6f52dd', bgcolor: '#faf8ff',
                  transition: '0.15s',
                  '&:hover': { borderColor: '#6f52dd', bgcolor: '#ede9fb' },
                }}
              >
                <UploadFile sx={{ fontSize: 28 }} />
                <Typography variant="body2" fontWeight={500} mt={0.5}>Upload a tool to adapt</Typography>
                <Typography variant="caption" color="text.secondary">PDF, Word, or TXT file</Typography>
                <input type="file" hidden multiple accept=".pdf,.doc,.docx,.txt" />
              </Box>
            )}

            {/* Form fields — disabled when in adapt mode */}
            <Box sx={{ opacity: toolMode === 'adapt' ? 0.45 : 1, pointerEvents: toolMode === 'adapt' ? 'none' : 'auto' }}>
            <Box display="flex" flexDirection="column" gap={2.5}>

              {/* Standard Framework */}
              <TextField
                select
                label="Standard"
                value={standardFramework}
                onChange={(e) => handleFrameworkChange(e.target.value)}
                fullWidth
                size="small"
              >
                {standardFrameworks.map((f) => (
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                ))}
              </TextField>

              {/* Grade Level — always visible, enabled after standard is selected */}
              <TextField
                select
                label="Grade Level"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                fullWidth
                size="small"
                disabled={!standardFramework}
              >
                {grades.map((g) => (
                  <MenuItem key={g} value={g}>Grade {g}</MenuItem>
                ))}
              </TextField>

              {/* Domain — always visible, enabled after framework is selected */}
              <TextField
                select
                label="Domain"
                value={domain}
                onChange={(e) => { setDomain(e.target.value); setDomainCode('') }}
                fullWidth
                size="small"
                disabled={!grade}
              >
                {domains.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>

              {/* Domain Code — always visible, enabled after domain is selected */}
              <TextField
                select
                label="Domain Code"
                value={domainCode}
                onChange={(e) => setDomainCode(e.target.value)}
                fullWidth
                size="small"
                disabled={!domain}
                SelectProps={{ renderValue: (value) => value as string }}
              >
                {(domainCodeMap[domain] ?? []).map(({ code, description }) => (
                  <MenuItem key={code} value={code}>
                    <Box>
                      <Typography variant="body2" fontWeight={600} color="#6f52dd">{code}</Typography>
                      <Typography variant="caption" color="text.secondary">{description}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <Divider />

              {/* Topic Mode */}
              <FormControl>
                <FormLabel sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                  Topic
                </FormLabel>
                <RadioGroup
                  row
                  value={topicMode}
                  onChange={(e) => handleTopicModeChange(e.target.value as 'own' | 'recommended')}
                >
                  <FormControlLabel
                    value="recommended"
                    control={<Radio size="small" sx={{ color: '#6f52dd', '&.Mui-checked': { color: '#6f52dd' } }} />}
                    label={<Typography variant="body2">Select Recommended</Typography>}
                  />

                  <FormControlLabel
                    value="own"
                    control={<Radio size="small" sx={{ color: '#6f52dd', '&.Mui-checked': { color: '#6f52dd' } }} />}
                    label={<Typography variant="body2">Write My Own</Typography>}
                  />
                </RadioGroup>
              </FormControl>

              {/* Write My Own */}
              {topicMode === 'own' && (
                <TextField
                  label="Your Topic"
                  placeholder="e.g. Serena Williams"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                />
              )}

              {/* Select Recommended */}
              {topicMode === 'recommended' && (
                <>
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

                  {/* Topic Subcategory — always visible, enabled after category is selected */}
                  <TextField
                    select
                    label="Topic Subcategory"
                    value={topicSubcategory}
                    onChange={(e) => { setTopicSubcategory(e.target.value); setSpecificTopic('') }}
                    fullWidth
                    size="small"
                    disabled={!topicCategory}
                  >
                    {subcategories.map((s) => (
                      <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                  </TextField>

                  {/* Specific Topic — always visible, enabled after subcategory is selected */}
                  <TextField
                    select
                    label="Topic"
                    value={specificTopic}
                    onChange={(e) => setSpecificTopic(e.target.value)}
                    fullWidth
                    size="small"
                    disabled={!topicSubcategory}
                  >
                    {specificTopics.map((t) => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </TextField>
                </>
              )}

              <Divider />
              {/* Advanced Settings */}
              <Button
                variant="outlined"
                startIcon={<Tune fontSize="small" />}
                onClick={() => setAdvancedOpen(true)}
                fullWidth
                sx={{
                  borderColor: '#6f52dd', color: '#6f52dd',
                  '&:hover': { bgcolor: '#ede9fb', borderColor: '#6f52dd' },
                }}
              >
                Advanced Settings
              </Button>

            </Box>
            </Box>{/* end disabled wrapper */}


            {/* Generate button */}
            <Box mt={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<AutoAwesomeIcon />}
                disabled={!canGenerate}
                sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' }, borderRadius: 2, py: 1.2 }}
              >
                Generate Tool
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Right card — lesson content editor */}
        <Card variant="outlined" sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column', minHeight: 580 }}>

          {/* Toolbar */}
          <Box
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              px: 1.5, py: 0.75, borderBottom: '1px solid', borderColor: 'divider', gap: 1,
            }}
          >
            <Button size="small" variant="outlined" startIcon={<History fontSize="small" />}
              sx={{ borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: '#6f52dd', color: '#6f52dd' } }}>
              Versions
            </Button>
            <Button size="small" variant="outlined" startIcon={<Save fontSize="small" />}
              sx={{ borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: '#6f52dd', color: '#6f52dd' } }}>
              Save Draft
            </Button>
            <Button size="small" variant="contained" startIcon={<Publish fontSize="small" />}
              sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}>
              Publish
            </Button>
          </Box>

          {/* Editable content area */}
          <Box sx={{ flexGrow: 1, position: 'relative' }}>

            {/* Empty state placeholder */}
            {editorEmpty && (
              <Box sx={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', gap: 1,
              }}>
                <AutoAwesomeIcon sx={{ fontSize: 32, color: '#d0c4f5' }} />
                <Typography variant="body2" color="text.disabled" textAlign="center" maxWidth={260}>
                  Complete the form and click <strong>Generate Tool</strong> to create the first version of your tool.
                </Typography>
              </Box>
            )}

            <Box
              ref={editorRef}
              sx={{
                height: '100%', minHeight: 480, p: 3,
                fontSize: 15, lineHeight: 1.7, color: 'text.primary',
                fontFamily: 'Poppins, sans-serif',
                '& h2': { fontSize: '1.4rem', fontWeight: 700, mb: 1, mt: 2 },
                '& h3': { fontSize: '1.15rem', fontWeight: 600, mb: 0.5, mt: 1.5 },
                '& ul, & ol': { pl: 3 },
                '& p': { my: 0.5 },
              }}
            />
          </Box>

          {/* AI chat input */}
          <Box
            sx={{
              borderTop: '1px solid', borderColor: 'divider',
              px: 2, py: 1.5, display: 'flex', gap: 1, alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask AI to revise, expand, or improve the lesson…"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AutoAwesomeIcon sx={{ fontSize: 16, color: '#6f52dd' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: '#fafafa' },
              }}
            />
            <IconButton
              sx={{
                bgcolor: '#6f52dd', color: '#fff', borderRadius: 2,
                '&:hover': { bgcolor: '#5a3fc0' },
              }}
            >
              <Send fontSize="small" />
            </IconButton>
          </Box>
        </Card>

      </Box>

      {/* Advanced Settings Modal */}
      <Dialog open={advancedOpen} onClose={() => setAdvancedOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>
          Advanced Settings
          <Typography variant="body2" color="text.secondary" fontWeight={400} mt={0.5}>
            All fields are optional. Use them to further customize the generated lesson.
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* Lesson Sections */}
          <Box>
            <Typography variant="body2" fontWeight={600} mb={0.5}>Tool Sections</Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
              Select the sections to include in the generated lesson.
            </Typography>
            <FormGroup>
              {['Teacher Preparation', 'Learning Overview', 'Objective and Learning Outcomes', 'Story/Narrative', 'Math Tasks', 'End Discussion'].map((section) => (
                <FormControlLabel
                  key={section}
                  control={
                    <Checkbox
                      size="small"
                      checked={selectedSections.includes(section)}
                      onChange={() => toggleSection(section)}
                      sx={{ color: '#6f52dd', '&.Mui-checked': { color: '#6f52dd' } }}
                    />
                  }
                  label={<Typography variant="body2">{section}</Typography>}
                />
              ))}
            </FormGroup>
          </Box>

          <Divider />

          {/* Practice Configuration */}
          <Box>
            <Box mb={0.5}>
              <Typography variant="body2" fontWeight={600} marginBottom={3}>Exercise Configuration</Typography>
            </Box>

            <Box display="flex" flexDirection="column" gap={2.5}>

              {/* Number of exercises */}
              <Box>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="body2">Number of Exercises</Typography>
                  <Typography variant="body2" fontWeight={600} color="#6f52dd">{exerciseCount}</Typography>
                </Box>
                <Slider
                  value={exerciseCount}
                  onChange={(_, v) => setExerciseCount(v as number)}
                  min={1} max={20} step={1}
                  sx={{ color: '#6f52dd' }}
                />
              </Box>

              {/* Exercise types */}
              <Box>
                <Typography variant="body2" mb={1}>Type of Exercises</Typography>
                <FormGroup>
                  {['Word Problems', 'Equations', 'Real-World Problems', 'Multiple Choice', 'Error Analysis', 'Open Response'].map((type) => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          size="small"
                          checked={exerciseTypes.includes(type)}
                          onChange={() => toggleExerciseType(type)}
                          sx={{ color: '#6f52dd', '&.Mui-checked': { color: '#6f52dd' } }}
                        />
                      }
                      label={<Typography variant="body2">{type}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>

              <Divider />

              {/* Toggles */}
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={includeGraphics} onChange={(e) => setIncludeGraphics(e.target.checked)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6f52dd' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#6f52dd' } }} />}
                  label={
                    <Box>
                      <Typography variant="body2">Include Graphics & Visual Representations</Typography>
                      <Typography variant="caption" color="text.secondary">Add diagrams, number lines, or charts to exercises.</Typography>
                    </Box>
                  }
                  sx={{ alignItems: 'flex-start', mb: 1.5 }}
                />
                <FormControlLabel
                  control={<Switch checked={applyGleam} onChange={(e) => setApplyGleam(e.target.checked)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6f52dd' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#6f52dd' } }} />}
                  label={
                    <Box>
                      <Typography variant="body2">Apply GLEAM Framework</Typography>
                      <Typography variant="caption" color="text.secondary">Embed culturally responsive elements throughout exercises.</Typography>
                    </Box>
                  }
                  sx={{ alignItems: 'flex-start', mb: 1.5 }}
                />
              </FormGroup>

            </Box>
          </Box>

          <Divider />

          {/* Classroom Information */}
          <Box>
            <Typography variant="body2" fontWeight={600} mb={0.5}>Classroom Information</Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
              Help us tailor the lesson to your specific classroom context.
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>

              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <TextField
                  label="Number of Students"
                  type="number"
                  value={studentCount}
                  onChange={(e) => setStudentCount(e.target.value)}
                  size="small"
                  inputProps={{ min: 1, max: 100 }}
                />
                <TextField
                  select
                  label="Ethnicity"
                  value={ethnicity}
                  onChange={(e) => setEthnicity(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[])}
                  size="small"
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => (selected as string[]).join(', '),
                  }}
                >
                  {[
                    'Black / African American',
                    'Hispanic / Latino',
                    'Asian / Pacific Islander',
                    'Native American / Indigenous',
                    'White / European',
                    'Middle Eastern / North African',
                    'Multiracial / Mixed',
                    'Other',
                  ].map((e) => (
                    <MenuItem key={e} value={e}>
                      <Checkbox size="small" checked={ethnicity.includes(e)}
                        sx={{ color: '#6f52dd', '&.Mui-checked': { color: '#6f52dd' }, p: 0.5 }} />
                      <Typography variant="body2">{e}</Typography>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <Typography variant="body2" mb={1}>Classroom Characteristics</Typography>
                <FormGroup>
                  {[
                    'English Language Learners',
                    'Mixed Ability Levels',
                    'Special Education Needs',
                    'Gifted & Talented',
                    'Multilingual Classroom',
                  ].map((trait) => (
                    <FormControlLabel
                      key={trait}
                      control={
                        <Checkbox
                          size="small"
                          checked={classroomTraits.includes(trait)}
                          onChange={() => toggleTrait(trait)}
                          sx={{ color: '#6f52dd', '&.Mui-checked': { color: '#6f52dd' } }}
                        />
                      }
                      label={<Typography variant="body2">{trait}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>

              <TextField
                label="Additional Context"
                placeholder="Describe anything else about your class that might help personalize the lesson…"
                value={classroomContext}
                onChange={(e) => setClassroomContext(e.target.value)}
                size="small"
                multiline
                rows={3}
                fullWidth
              />

            </Box>
          </Box>

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAdvancedOpen(false)} variant="contained"
            sx={{ bgcolor: '#6f52dd', '&:hover': { bgcolor: '#5a3fc0' } }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  )
}
