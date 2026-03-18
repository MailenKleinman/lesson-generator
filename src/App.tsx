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
import TopicManagement from './pages/TopicManagement'
import SourceManagement from './pages/SourceManagement'
import EditStandard from './pages/EditStandard'
import MathTemplates from './pages/MathTemplates'

export default function App() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [sidebarOpen, setSidebarOpen] = useState(!isSmall)
  const [activePage, setActivePage] = useState<Page>('home')
  const [editingStandardId, setEditingStandardId] = useState<number | null>(null)
  const [editingStandardDescription, setEditingStandardDescription] = useState('')

  const navigateTo = (page: Page) => {
    setActivePage(page)
    if (isSmall) setSidebarOpen(false)
  }

  const handleEditStandard = (id: number, description: string) => {
    setEditingStandardId(id)
    setEditingStandardDescription(description)
    setActivePage('editStandard')
  }

  function renderPage(page: Page) {
    switch (page) {
      case 'home': return <Dashboard />
      case 'createLesson': return <CreateLesson />
      case 'myLessons': return <Lessons />
      case 'profile': return <Profile />
      case 'helpImprove': return <HelpImprove />
      case 'support': return <Support />
      case 'addStandards': return <AddStandards onEdit={handleEditStandard} />
      case 'editStandard': return <EditStandard standardId={editingStandardId} standardDescription={editingStandardDescription} onBack={() => setActivePage('addStandards')} />
      case 'dataManagement': return <DataManagement />
      case 'usersManagement': return <UsersManagement />
      case 'contentEditor': return <SourceManagement />
      case 'topicManagement': return <TopicManagement />
      case 'mathTemplates': return <MathTemplates />
    }
  }

return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <Sidebar
        open={sidebarOpen}
        activePage={activePage}
        onToggle={() => setSidebarOpen((o) => !o)}
        onNavigate={navigateTo}
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
