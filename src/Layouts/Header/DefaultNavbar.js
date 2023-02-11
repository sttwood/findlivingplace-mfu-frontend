import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Style
import { styled } from "@mui/material/styles"
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,
    CssBaseline,
    useScrollTrigger,
    Fade,
    Fab,
    Avatar,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon,
    IconButton,
    Divider,
    Badge
} from "@mui/material";

import DefaultDrawer from './DefaultDrawer'
import SearchBar from '../../Components/nav/SearchBar'

// Icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ManageAccounts from '@mui/icons-material/ManageAccountsOutlined'
import ListAlt from '@mui/icons-material/ListAlt'
import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import UserListIcon from "@mui/icons-material/PeopleAltOutlined";
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Logout from '@mui/icons-material/Logout'
// Logo
import MyLogo from '../../Assets/Images/flp-logo.png'



// ----------------------------------------- MUI CSS Styles -----------------------------------------
const BtnSignIn = styled(Button)(() => ({
    marginRight: '1rem',
    color: '#c6bad1',
    borderColor: '#192c33',
    '&:hover': {
        color: 'rgba(255, 255, 255, 0.5)',
        borderColor: '#25424a'
    },
}))
const BtnSignUp = styled(Button)(() => ({
    color: '#ffffff',
    backgroundColor: '#192c33',
    '&:hover': {
        backgroundColor: '#25424a',
        color: '#ffffff'
    },
}))
const BtnLink = styled(Button)(() => ({
    my: 2,
    color: "white",
    display: "block",
    '&:hover': {
        color: '#c9c9c9'
    }
}))
const BtnNewPost = styled(Button)(({ theme }) => ({
    color: '#ffffff',
    backgroundColor: '##03a9f4',
    '&:hover': {
        backgroundColor: '##0276aa',
    },
    fontSize: '0.8rem',
    [ theme.breakpoints.down('lg') ]: {
        fontSize: '0.6rem'
    },

}))

const LogoImage = styled('img')(() => ({
    width: '100%',
    height: 'auto',
    maxWidth: '30px'
}))
const LogoText = styled('a')(() => ({
    fontFamily: "monospace",
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
    '&:hover': {
        color: '#192c33'
    }
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px #37506a`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

// --------------------------------------------------------------------------------------------------

// Back to Top
function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };
    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

// REACT
const DefaultNavbar = (props) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [ anchorElUser, setAnchorElUser ] = useState(null)

    // Sign Out
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        navigate('/')
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: '#37506a' }}>
                <Container maxWidth="xxl">
                    <Toolbar disableGutters>
                        {/* --------------------------------------------- DESKTOP NAV --------------------------------------------- */}
                        <LogoImage
                            alt="Find Living Place Logo"
                            src={MyLogo}
                            sx={{ display: { xs: "none", lg: "flex" }, mr: 1 }}
                        />
                        <LogoText
                            variant="h6"
                            nowrap="true"
                            component="a"
                            href="/"
                            sx={{ mr: 2, display: { xs: "none", lg: "flex" } }}
                        >
                            FLP
                        </LogoText>
                        {/* DESKTOP MENU LINK */}
                        <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
                            <BtnLink component={Link} to='/'>
                                Home
                            </BtnLink>
                        </Box>
                        {/* ------------------------------------------------------------------------------------------------------- */}

                        {/* --------------------------------------------- MOBILE NAV --------------------------------------------- */}
                        <DefaultDrawer />
                        {/* ------------------------------------------------------------------------------------------------------ */}

                        {/* --------------------------------------------- SEARCH BAR --------------------------------------------- */}
                        <SearchBar />
                        {/* ------------------------------------------------------------------------------------------------------ */}

                        {/* --------------------------------------------- MENU RIGHT --------------------------------------------- */}
                        {user !== null && (
                            user.role === 'user' ? (
                                <>
                                    <BtnNewPost
                                        sx={{ flexGrow: 0, display: { xs: "none", lg: "flex" } }}
                                        variant="contained"
                                        component={Link}
                                        to="/user/create-place"
                                    >
                                        + New Post
                                    </BtnNewPost>
                                    <Button
                                        nowrap="true"
                                        component={Link}
                                        to="/user/favorite"
                                    >
                                        <BookmarkIcon sx={{ color: '#FFBD2EFF' }} />
                                    </Button>
                                    <Box sx={{ flexGrow: 0 }}>

                                        {/* Avatar Menu */}
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleOpenUserMenu}
                                                sx={{ p: 1 }}
                                            >
                                                <StyledBadge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    variant="dot"
                                                >
                                                    <Avatar src="/broken-image.jpg" />
                                                </StyledBadge>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: "45px" }}
                                            id="account-menu"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right"
                                            }}
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right"
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                }
                                            }}
                                        >
                                            <MenuItem component={Link} to='/user/my-account'>
                                                <ListItemIcon>
                                                    <ManageAccounts fontSize="small" />
                                                </ListItemIcon>
                                                My account
                                            </MenuItem>
                                            <MenuItem component={Link} to='/user/my-post'>
                                                <ListItemIcon>
                                                    <ListAlt fontSize="small" />
                                                </ListItemIcon>
                                                My post
                                            </MenuItem>

                                            <Divider />

                                            <MenuItem onClick={logout}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Sign Out
                                            </MenuItem>

                                        </Menu>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <BtnNewPost
                                        sx={{ flexGrow: 0, display: { xs: "none", lg: "flex" } }}
                                        variant="contained"
                                        component={Link}
                                        to="/admin/create-place"
                                    >
                                        + New Post
                                    </BtnNewPost>
                                    <Button
                                        nowrap="true"
                                        component={Link}
                                        to="/admin/favorite"
                                    >
                                        <BookmarkIcon sx={{ color: '#FFBD2EFF' }} />
                                    </Button>
                                    <Box sx={{ flexGrow: 0 }}>

                                        {/* Avatar Menu */}
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleOpenUserMenu}
                                                sx={{ p: 1 }}
                                            >
                                                <StyledBadge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    variant="dot"
                                                >
                                                    <Avatar src="/broken-image.jpg" />
                                                </StyledBadge>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: "45px" }}
                                            id="account-menu"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right"
                                            }}
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right"
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem component={Link} to='/admin/dashboard'>
                                                <ListItemIcon>
                                                    <DashboardIcon fontSize="small" />
                                                </ListItemIcon>
                                                Dashboard
                                            </MenuItem>
                                            <MenuItem component={Link} to='/admin/user-list'>
                                                <ListItemIcon>
                                                    <UserListIcon fontSize="small" />
                                                </ListItemIcon>
                                                User List
                                            </MenuItem>
                                            <MenuItem component={Link} to='/admin/post-list'>
                                                <ListItemIcon>
                                                    <ListAlt fontSize="small" />
                                                </ListItemIcon>
                                                Post List
                                            </MenuItem>

                                            <Divider />

                                            <MenuItem onClick={logout}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Sign Out
                                            </MenuItem>

                                        </Menu>
                                    </Box>
                                </>
                            )
                        )}

                        {!user && (
                            <Box sx={{ flexGrow: 0, display: { xs: "none", lg: "flex" } }}>
                                <BtnSignIn variant="outlined" component={Link} to={'/login'}>Sign In</BtnSignIn>
                                <BtnSignUp variant="contained" component={Link} to={'/register'}>Sign Up</BtnSignUp>
                            </Box>
                        )}
                        {/* ------------------------------------------------------------------------------------------------------ */}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Back To Top */}
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            <Toolbar id="back-to-top-anchor" />
        </React.Fragment >
    )
}

export default DefaultNavbar