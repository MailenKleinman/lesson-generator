import { useState } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Sidebar, { Page } from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import CreateLesson from './pages/CreateLesson'
import Lessons from './pages/Lessons'
import Profile from './pages/Profile'
import HelpImprove from './pages/HelpImprove'
import Support from './pages/Support'
import AddStandards from './pages/AddStandards'
import DataManagement from './pages/DataManagement'
import UsersManagement from './pages/UsersManagement'

function renderPage(page: Page) {
  switch (page) {
    case 'home': return <Dashboard />
    case 'createLesson': return <CreateLesson />
    case 'myLessons': return <Lessons />
    case 'profile': return <Profile />
    case 'helpImprove': return <HelpImprove />
    case 'support': return <Support />
    case 'addStandards': return <AddStandards />
    case 'dataManagement': return <DataManagement />
    case 'usersManagement': return <UsersManagement />
    case 'contentEditor': return <Box sx={{ p: 2 }}><Typography variant="h4" fontWeight={600}>Source Management</Typography></Box>
    case 'topicManagement': return <Box><Typography variant="h4" fontWeight={600}>Topic Management</Typography></Box>
  }
}

export default function App() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [sidebarOpen, setSidebarOpen] = useState(!isSmall)
  const [activePage, setActivePage] = useState<Page>('home')

return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <Sidebar
        open={sidebarOpen}
        activePage={activePage}
        onToggle={() => setSidebarOpen((o) => !o)}
        onNavigate={(page) => {
          setActivePage(page)
          if (isSmall) setSidebarOpen(false)
        }}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 5,
          pl: 6,
          pr: 6,
          pb: 3,
          bgcolor: '#f5eeff',
        }}
      >
        {renderPage(activePage)}
      </Box>
    </Box>
  )
}
