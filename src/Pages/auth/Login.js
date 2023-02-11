import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

// Style
import '../../Assets/Styles/pages/auth/Login.css'
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


// Functions
import { login } from '../../Services/Functions/auth'

// Redux
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


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

const Login = () => {
    const form = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ value, setValue ] = useState({
        email: '',
        password: '',
    })

    const roleBaseRedirect = (role) => {
        if (role === 'admin') {
            navigate('/admin/dashboard')
        } else {
            navigate('/')
        }
    }

    const handleChange = (e) => {
        setValue({
            ...value,
            [ e.target.name ]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        login(value)
            .then((res) => {
                alert(res.data.payload.user.email + ' Login Success')
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        token: res.data.token,
                        _id: res.data.payload.user._id,
                        email: res.data.payload.user.email,
                        firstname: res.data.payload.user.firstname,
                        lastname: res.data.payload.user.lastname,
                        telephone: res.data.payload.user.telephone,
                        role: res.data.payload.user.role,
                        count: res.data.length
                    },
                })

                localStorage.setItem('token', res.data.token)
                roleBaseRedirect(res.data.payload.user.role)
            })
            .catch((err) => {
                console.log(err.response.data)
                alert(err.response.data)
            });
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
                                Sign in
                            </Typography>
                            <Box component="form" ref={form} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

                                <div className="col1">
                                    {/* password */}
                                    <StyleInputText
                                        type="password"
                                        name="password"
                                        label="Password"
                                        variant="outlined"
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={value.password.length < 8}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link to="/forgot-password" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        {/* already have account */}
                                        <p>Not have an account yet? <Link to='/register'>Sign Up</Link></p>
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

export default Login