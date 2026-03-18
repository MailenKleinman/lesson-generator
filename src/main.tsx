import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6f52dd',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          overflowX: 'hidden',
        },
        '*, *::before, *::after': {
          '&:focus:not(:focus-visible)': {
            outline: 'none !important',
            boxShadow: 'none !important',
          },
        },
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
