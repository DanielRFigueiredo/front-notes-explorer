import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './style/global'

import { Routes } from './routes'

import theme from './style/theme'

import UserProvider from './hooks/auth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <GlobalStyles />
        <Routes />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
)
