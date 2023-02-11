import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Style
import { styled } from "@mui/material/styles";
import {
    Button,
    Divider,
    Box,
    Drawer,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


// ----------------------------------------- MUI CSS Styles -----------------------------------------
const BtnSignIn = styled(Button)(() => ({
    color: '#ffffff',
    backgroundColor: '#192c33',
    '&:hover': {
        backgroundColor: '#25424a',
        color: '#ffffff'
    },
}))

// --------------------------------------------------------------------------------------------------



// REACT
const DefaultDrawer = (props) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [anchorElNav, setAnchorElNav] = useState(false);
    const { window } = props;


    const handleOpenNavMenu = () => {
        setAnchorElNav(!anchorElNav);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
                {/* MOBILE Hamburger Icon */}
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                {/* MOBILE MENU LINK */}

            </Box>
            <Drawer
                container={container}
                variant="temporary"
                open={anchorElNav}
                onClose={handleOpenNavMenu}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", lg: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 240
                    }
                }}
            >
                <Box onClick={handleOpenNavMenu} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        FLP MENU
                    </Typography>
                    
                    <Divider />

                    <List>
                        <ListItem disablePadding >
                            <ListItemButton component={Link} to='/' sx={{ textAlign: 'center' }}>
                                <ListItemText primary='Home' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to='/advance-search' sx={{ textAlign: "center" }}>
                                <ListItemText primary="Search" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    {user === null ? (
                        <BtnSignIn
                            variant="contained"
                            component={Link}
                            to={'/login'}
                        >
                            Sign In
                        </BtnSignIn>
                    ) : (
                        user.role === 'user' ? (
                            <BtnSignIn
                                variant="contained"
                                component={Link}
                                to={'/user/create-place'}
                            >
                                + New post
                            </BtnSignIn>
                        ) : (
                            <BtnSignIn
                                variant="contained"
                                component={Link}
                                to={'/admin/create-place'}
                            >
                                + New post
                            </BtnSignIn>
                        )
                    )}
                    
                </Box>
            </Drawer>
        </>
    )
}

export default DefaultDrawer