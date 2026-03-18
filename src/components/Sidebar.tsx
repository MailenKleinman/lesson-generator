import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Home,
  AddCircleOutline,
  MenuBook,
  Person,
  Feedback,
  HelpOutline,
  Rule,
  Storage,
  ManageAccounts,
  School,
  ChevronLeft,
  ChevronRight,
  Logout,
  Topic,
  Calculate,
} from '@mui/icons-material'

export type Page =
  | 'home'
  | 'createLesson'
  | 'myLessons'
  | 'profile'
  | 'helpImprove'
  | 'support'
  | 'addStandards'
  | 'editStandard'
  | 'dataManagement'
  | 'usersManagement'
  | 'contentEditor'
  | 'topicManagement'
  | 'mathTemplates'

interface NavItem {
  id: Page
  label: string
  icon: React.ReactNode
}

const MAIN_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home /> },
  { id: 'createLesson', label: 'Create new tool', icon: <AddCircleOutline /> },
  { id: 'myLessons', label: 'My tools', icon: <MenuBook /> },
]

const SUPPORT_ITEMS: NavItem[] = [
  { id: 'profile', label: 'Profile', icon: <Person /> },
  { id: 'helpImprove', label: 'Help us improve', icon: <Feedback /> },
  { id: 'support', label: 'Support', icon: <HelpOutline /> },
]

const ADMIN_ITEMS: NavItem[] = [
  { id: 'addStandards', label: 'Standards', icon: <Rule /> },
  { id: 'mathTemplates', label: 'Math Templates', icon: <Calculate /> },
  { id: 'contentEditor', label: 'Sources', icon: <School /> },
  { id: 'topicManagement', label: 'Topics', icon: <Topic /> },
  { id: 'usersManagement', label: 'Users', icon: <ManageAccounts /> },
  { id: 'dataManagement', label: 'Data', icon: <Storage /> },
]

export const SIDEBAR_EXPANDED = 240
export const SIDEBAR_COLLAPSED = 64

interface SidebarProps {
  open: boolean
  activePage: Page
  onToggle: () => void
  onNavigate: (page: Page) => void
}

export default function Sidebar({ open, activePage, onToggle, onNavigate }: SidebarProps) {
  const width = open ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED

  const renderItem = (item: NavItem) => (
    <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
      <Tooltip title={open ? '' : item.label} placement="right" arrow>
        <ListItemButton
          selected={activePage === item.id}
          onClick={() => onNavigate(item.id)}
          sx={{
            minHeight: 36,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{ fontSize: 13 }}
            sx={{ opacity: open ? 1 : 0, whiteSpace: 'nowrap' }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  )

  const renderSectionLabel = (label: string) =>
    open ? (
      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ px: 2.5, pt: 1.5, pb: 0.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}
      >
        {label}
      </Typography>
    ) : null

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
        '& .MuiDrawer-paper': {
          width,
          overflow: 'hidden',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          px: open ? 2 : 0,
          py: 1,
          minHeight: 64,
        }}
      >
        {open && (
          <Box component="img" src="/images/logo.png" alt="Onyx" sx={{ height: 32, objectFit: 'contain' }} />
        )}
        <IconButton onClick={onToggle} size="small">
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Divider />

      {/* Main nav */}
      <List sx={{ flexGrow: 1, pt: 1, overflow: 'hidden' }}>
        {MAIN_ITEMS.map(renderItem)}

        <Divider sx={{ my: 1 }} />

        {renderSectionLabel('General')}
        {SUPPORT_ITEMS.map(renderItem)}

        <Divider sx={{ my: 1 }} />

        {renderSectionLabel('Admin')}
        {ADMIN_ITEMS.map(renderItem)}
      </List>

      <Divider />

      {/* Logout */}
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <Tooltip title={open ? '' : 'Log out'} placement="right" arrow>
            <ListItemButton
              onClick={() => {}}
              sx={{
                minHeight: 36,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: 'error.main',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: 'error.main',
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Log out"
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{ opacity: open ? 1 : 0, whiteSpace: 'nowrap' }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Drawer>
  )
}
