import { Typography } from '@mui/material'

const ColorLegend = ({ label, color }) => {
    return (
        <Typography color='textSecondary' sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            '&:before': {
                content: '""',
                display: 'inline-block',
                textAlign: 'center',
                width: 15,
                height: 15,
                marginRight: 1,
                bgcolor: color,
            }
        }}>{label}</Typography>
    )
}

export default ColorLegend