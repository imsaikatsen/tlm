import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App'
////========THEME
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material/'
import { DefaultTheme } from 'Services/Theme'
import { SWRConfig } from 'swr'
import { axiosInstanceFetcher } from 'Services/SwrFetchers'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline /> {/* This is for the Material UI Default background color */}
      <SWRConfig value={{
        fetcher: axiosInstanceFetcher,
        suspense: true,
        revalidateIfStale: false, //if SWR should revalidate on mounting if the cache exists (That means it revalidate from cache)
        revalidateOnFocus: false, // User return from another tab
        revalidateOnReconnect: true, // When computer comes online (User return from lock screen)
      }}>
        <App />
      </SWRConfig>
    </ThemeProvider>
  </StrictMode>
)

