import { Box, useTheme } from '@mui/material'
import { ThreeCircles } from 'react-loader-spinner' // Removing RotatingLines for removing warning


const Spinner = ({ width = 100, strokeWidht = 2 }) => {
    const theme = useTheme()
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <RotatingLines width={width} strokeWidth={strokeWidht} strokeColor="red" animationDuration="1.75" /> */}
            <ThreeCircles
                height="100"
                width="100"
                color={theme.palette.primary.main}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=''
            />
        </Box>

    )
}

export default Spinner