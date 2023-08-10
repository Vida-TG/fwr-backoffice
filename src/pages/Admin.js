import React, { useState } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from "react-router";
import SideMenu from "../layouts/SideMenu";
import Logo from '../assets/Foreign_Wive_Reigns.png'

const Admin =  (props)=>{
    const drawerWidth = 255
    const [mobileOpen, setMobileOpen] = useState(false)
    const [open, setOpen] = useState(true)
    const { window } = props

    const handleDrawerToggle = ()=>{
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <div className='App sidebar text-white border-0'>
            <Toolbar className='my-0 justify-content-center'>
                <img className="my-3 img-fluid" src={Logo} alt="user" />                
            </Toolbar>      
            <SideMenu />      
        </div>
    )
    const container = window !== undefined ? () => window().document.body : undefined;

    return(
        <div className="">
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <AppBar
                    className='shadow-none mb-5'
                    position="fixed"
                    sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    }}
                >
                <Toolbar className='bg-white text-dark'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    {/* <ProfileBar /> */}
                </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                        >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                component="main" 
                sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Outlet />
                </Box>
            </Box>
        </div>
    )
}

export default Admin