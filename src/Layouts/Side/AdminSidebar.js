import React from 'react'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// MUI Materail
import { styled, useTheme } from "@mui/material/styles"
import MuiDrawer from '@mui/material/Drawer'
import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

// MUI Icon
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import UserListIcon from "@mui/icons-material/PeopleAltOutlined";
import PostListIcon from "@mui/icons-material/ListAltOutlined";
import BackHomeIcon from "@mui/icons-material/DoorBackOutlined";
import AddPostIcon from "@mui/icons-material/AddCircleOutline"
import Category from "@mui/icons-material/CategoryOutlined"
import SignOutIcon from "@mui/icons-material/LogoutOutlined";
import MyFavoriteIcon from "@mui/icons-material/CollectionsBookmarkOutlined"


// Side bar
const openedMixin = (theme) => ({
    width: 240,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [ theme.breakpoints.up("sm") ]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

const LogoText = styled('div')(({ theme }) => ({
    fontFamily: "monospace",
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
}))

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
    width: 240,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme)
    })
}));

// REACT
const AdminSidebar = () => {
    const theme = useTheme();
    const [ open, setOpen ] = React.useState(false);
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


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex", p: 5 }}>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                        {/* Hamburger Menu */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                ...(open && { display: "none" })
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Close Sidebar */}
                        <Box sx={open ? { display: "block" } : { display: "none" }}>
                            <LogoText>FLP MENU</LogoText>
                        </Box>
                        <IconButton
                            onClick={handleDrawerClose}
                            sx={open ? { display: "block" } : { display: "none" }}
                        >
                            {theme.direction === "rtl" 
                            ? (<ChevronRightIcon />) 
                            : (<ChevronLeftIcon />)
                            }
                        </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {/* Dashboard */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                            component={Link}
                            to='/admin/dashboard'
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Dashboard' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    {/* User list */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                            component={Link}
                            to='/admin/user-list'
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                <UserListIcon />
                            </ListItemIcon>
                            <ListItemText primary='User list' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    {/* Post list */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                            component={Link}
                            to='/admin/post-list'
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                <PostListIcon />
                            </ListItemIcon>
                            <ListItemText primary='Post list' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    {/* My Favorite */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                            component={Link}
                            to='/admin/favorite'
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                <MyFavoriteIcon />
                            </ListItemIcon>
                            <ListItemText primary='My Favorite' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    {/* Category */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                            component={Link}
                            to='/admin/create-category'
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                <Category />
                            </ListItemIcon>
                            <ListItemText primary='Category' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    {/* Create Post */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                            component={Link}
                            to='/admin/create-place'
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                <AddPostIcon />
                            </ListItemIcon>
                            <ListItemText primary='New post' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider />
                <List>
                    {/* Back to Home */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                            component={Link}
                            to='/'
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center"
                                }}
                            >
                                <BackHomeIcon />
                            </ListItemIcon>
                            <ListItemText primary='Back Homepage' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    {/* Sign Out */}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            onClick={logout}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color: 'rgba(255, 62, 71, 0.9)'
                                }}
                            >
                                <SignOutIcon />
                            </ListItemIcon>
                            <ListItemText primary='Sign Out' sx={{ color: 'rgba(255, 62, 71, 0.9)' , opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            
            <Outlet />
        </Box>
    )
}

export default AdminSidebar