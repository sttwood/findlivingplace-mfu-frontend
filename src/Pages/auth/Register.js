import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

// Email Sender
import emailjs from '@emailjs/browser'

// Redux
import { useNavigate } from 'react-router-dom'

// Functions
import { register } from '../../Services/Functions/auth'

// Style
import '../../Assets/Styles/pages/auth/Register.css'
// MUI
import {
    Box,
    Grid,
    CssBaseline,
    Typography,
    Button,
    Paper,
    TextField,
} from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
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

// Stlyes
const StyleInputText = styled(TextField)`
    & .MuiOutlinedInput-notchedOutline {
        height: 100%;
        border-radius: 10px;
        border: 2px solid rgba(0, 0, 0, 0.1);
        transition: 0.5s;
        outline: none;
    } &:hover fieldset {
        borderColor: grey;
    }
`


const Register = () => {
    const navigate = useNavigate()
    const form = useRef()
    const [ value, setValue ] = useState({
        firstname: '',
        lastname: '',
        telephone: '',
        email: '',
        password: '',
        password1: '',
    })

    const handleChange = (e) => {
        setValue({
            ...value,
            [ e.target.name ]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(value)
        if (value.password !== value.password1) {
            alert('Password are not match!')
        } else {
            register(value)
                .then((res) => {
                    alert('Sing up Successfully!')
                    // Gmail
                    emailjs.sendForm('service_wmqtfcm', 'template_64ilha6', form.current, '97DxrazAEqVm7DuVo')
                    // Outlook
                    emailjs.sendForm('service_xskxumj', 'template_64ilha6', form.current, '97DxrazAEqVm7DuVo')
                    console.log(res)
                    navigate('/login')
                })
                .catch((err) => {
                    console.log(err.response.data)
                    alert(err.response.data)
                })
        }
    }

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
                                Sign up
                            </Typography>
                            <Box component="form" ref={form} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <div className="col2">
                                    {/* firstname */}
                                    <div className="headname">
                                        <StyleInputText
                                            label="First Name"
                                            variant="outlined"
                                            type="text"
                                            name="firstname"
                                            onChange={handleChange}
                                            required={true}
                                        />
                                        
                                    </div>
                                    {/* lastname */}
                                    <div className="headname">
                                        <StyleInputText
                                            label="Last Name"
                                            variant="outlined"
                                            type="text"
                                            name="lastname"
                                            onChange={handleChange}
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <div className="col1">
                                    {/* telephone */}
                                    <StyleInputText
                                        type="text"
                                        name="telephone"
                                        label="Phone Number"
                                        variant="outlined"
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                <div className="col1">
                                    {/* email */}

                                    <StyleInputText
                                        type="email"
                                        name="email"
                                        label="Email Address"
                                        variant="outlined"
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                <div className="col2">
                                    {/* password */}
                                    <div className="headname">

                                        <StyleInputText
                                            type="password"
                                            name="password"
                                            label="Password"
                                            variant="outlined"
                                            onChange={handleChange}
                                            required={true}
                                        />
                                    </div>
                                    {/* confirmed password */}
                                    <div className="headname">

                                        <StyleInputText
                                            type="password"
                                            name="password1"
                                            label="Confirm Password"
                                            variant="outlined"
                                            onChange={handleChange}
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={value.password.length < 8}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                
                                    <Grid item>
                                        {/* already have account */}
                                        <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>


            </ThemeProvider>
        </Container>
    )
}

export default Register