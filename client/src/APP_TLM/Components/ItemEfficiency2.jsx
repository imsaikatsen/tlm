import { Box, Typography } from '@mui/material'


const getStyle = (efficiency) => {
    if (!efficiency) return { color: '#FFF', bgcolor: 'loom.error' } // Not found or 0 (Background red, text color white)
    if (efficiency >= 60) {
        return { color: '#FFF', bgcolor: 'loom.success' } // 60 - 100 (Background green, text color white)
    } else {
        return { color: '#FFF', bgcolor: 'loom.warning' } // 1 - 60 (Background yellow, text color black)
    }
}

const ItemEfficiency2 = ({ machine_no, efficiency, rpm }) => {
    return (
        <Box sx={{ border: '1px solid #bdbdbd', px: 1, py: 1, ...getStyle(efficiency) }}>
            <Typography variant='body2' color='textSecondary' textAlign='center'>LM - {machine_no}</Typography>
            <Typography variant="body2" color='inherit' >
                Rp : {rpm || 0}
            </Typography>
            <Typography variant="body2" color='inherit' >
                Eff : {efficiency || 0}%
            </Typography>
        </Box >
    )
}

export default ItemEfficiency2