import { Box, Card, CircularProgress, Grid, Typography, useTheme } from '@mui/material'

const getColor = (efficiency, theme) => {
    if (!efficiency) return theme.palette.secondary.main
    return efficiency < 85 ? theme.palette.secondary.main : theme.palette.primary.main
}

const ItemEfficiency = ({ machine_no, production_qty, rpm, efficiency }) => {
    const theme = useTheme()
    // const { data } = useSWR(machine_no ? `/tlm/multi-req/${machine_no}` : null)

    // console.log(data)


    return (
        <Card style={{ borderRadius: 0, backgroundColor: getColor(efficiency, theme) }}>
            <Box style={{ padding: theme.spacing(3), }}>
                <Typography variant='h6' style={{ fontWeight: 'bold', color: '#FFF', textAlign: 'center' }}>MACHINE - {machine_no}</Typography>
            </Box>
            <Grid container spacing={3} style={{ padding: theme.spacing(2), backgroundColor: '#FFF' }}>
                <Grid item xs={4} style={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                    <CircularProgressWithLabel value={efficiency} />
                </Grid>
                <Grid item xs={8} >
                    <Typography variant='body2' color='textSecondary'>PROD : <strong>{production_qty}</strong></Typography>
                    <Typography variant='body2' color='textSecondary' style={{ lineHeight: 2.5 }}>RPM : <strong>{rpm}</strong></Typography>
                </Grid>
            </Grid>
        </Card >
    )
}

export default ItemEfficiency


const CircularProgressWithLabel = (props) => {
    const theme = useTheme()
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress thickness={7} variant="determinate" {...props} style={{ height: 65, width: 65, transform: 'rotate(-90deg)', color: getColor(props?.value, theme) }} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="body1" style={{ fontWeight: 'bold', textAlign: 'center', color: getColor(props?.value, theme) }}>{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    )
}