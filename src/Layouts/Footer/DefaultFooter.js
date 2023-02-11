import React from 'react'

// MUI
import {
    CssBaseline,
    Box,
    Container,
    Typography,

} from '@mui/material'




const Copyright = () => {
    return (
        <Typography 
            variant="body2" 
            color="white" 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {'Copyright © FLP around MFU Teams'}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




const DefaultFooter = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: '#37506a',
                color: '#ffffff',
                boxShadow: '3px 3px 5px 10px rgba(0, 0, 0, 0.1)'
            }}
        >
            <CssBaseline />
            <Container maxWidth="sm">
                <Copyright />
            </Container>
        </Box>
    )
}

export default DefaultFooter