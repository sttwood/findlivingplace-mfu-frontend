import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

// Style
import '../../Assets/Styles/pages/auth/Login.css'
// MUI
import {
    Box,
    Grid,
    CssBaseline,
    Typography,
    Paper,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container } from '@mui/system'
// images
import SideImage from '../../Assets/Images/auth_img.jpg'



const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" component={Link} to="/">
                FLP around MFU website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();


const ForgetPassword = () => {
    const form = useRef()

    return (
        <Container className="Wrapper">
            <ThemeProvider theme={theme}>
                <Grid
                    container
                    component="main"
                >
                    <CssBaseline />

                    <Grid
                        item
                        xs={false}
                        md={6}
                        component={Paper}
                        square
                        sx={{
                            borderTopLeftRadius: '5px',
                            borderBottomLeftRadius: '5px',
                            backgroundImage: `url(${SideImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        md={6}
                        component={Paper}
                        square
                        sx={{
                            borderTopRightRadius: '5px',
                            borderBottomRightRadius: '5px',
                        }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Forgot Password
                            </Typography>
                            <Box component="form" ref={form} noValidate sx={{ mt: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,width: '100%'}}>
                                    <Typography>Contact us via Gmail: FLPmfu.service@gmail.com</Typography>
                                </div>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>


            </ThemeProvider>
        </Container>
    )
}

export default ForgetPassword