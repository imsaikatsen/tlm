import { createTheme } from '@mui/material/styles'

export const DefaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4fa94d',
            light: '#81db7b',
            dark: '#147920',
        },
        secondary: {
            main: '#e1567c',
            light: '#ff88ab',
            dark: '#ab1f50',
        },
        loom: {
            success: '#00c853',
            warning: '#fbc02d',
            error: '#d84315'
        }
    },
    typography: {
        fontFamily: [
            'Rubik',
            'sans-serif',
        ].join(',')
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            sm2: 750,
            md: 900,
            md2: 1050,
            lg: 1200,
            lg2: 1350,
            xl: 1536,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 0
                }
            }
        }
    }
})