import { Container, Grid, LinearProgress, Stack, Typography, useTheme } from '@mui/material' // deleted Avatar Chip from here
import ItemEfficiency2 from 'APP_TLM/Components/ItemEfficiency2'
import useSWR from 'swr'
import { universalDateFormat } from 'Helper/Dateformat'
import ColorLegend from 'APP_TLM/Components/ColorLegend'

const SINGLE_HOME = () => {
    const theme = useTheme()
    const { data, isValidating, } = useSWR(`/tlm/single-req`, {
        // refreshInterval: 600000, // 10 minute interval
        refreshInterval: 300000 // 5 min interval
    })

    return (
        <Container maxWidth='lg' sx={{ padding: 2 }}>
            <Typography variant='h4' color='textSecondary' style={{ fontWeight: 'bold', textAlign: 'center' }}>
                LOOM DASHBOARD - (SHIFT {data?.shift_name})
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' sx={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 2 }}>
                {universalDateFormat(data?.current_date, 'MM/DD/YYYY')} - ({data?.shift_time})
            </Typography>
            <Stack direction='row' spacing={1} sx={{ paddingBottom: 2 }} alignItems='center' justifyContent='center'>
                <Typography fontWeight='bold' color='textSecondary'>Efficiency - </Typography>
                <ColorLegend color={theme.palette.loom.error} label='0%' />
                <ColorLegend color={theme.palette.loom.warning} label='1-59%' />
                <ColorLegend color={theme.palette.loom.success} label='60-100%' />
            </Stack>
            {isValidating && <LinearProgress variant='query' />}
            <Grid container>
                {
                    data?.machineList?.map((item, index) => {
                        return <Grid item xs={3} sm={2} lg={1} key={index}>
                            <ItemEfficiency2 machine_no={item.machine_no} efficiency={item.efficiency} rpm={item.rpm} />
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    )
}

export default SINGLE_HOME