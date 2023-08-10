import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router';

const SideMenu = ()=>{
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <>
            {/* SideMenu */}
            <List className="mt-4">
                <ListItem disablePadding>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText>
                            <p className="my-0 px-3 fw-less-bold fs-4">Admin Panel</p>
                        </ListItemText>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admin')} className={location.pathname == '/admin' ? 'active' : ''} >
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText>
                            <p className={location.pathname == '/admin' ? 'my-0 fw-bold' : 'my-0'}>
                                 Dashboard
                            </p>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admin/notifications')} className={location.pathname == '/admin/notifications' ? 'active' : ''} >
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText>
                        <p className={location.pathname == '/admin/notifications' ? 'my-0 fw-bold' : 'my-0'}>
                             Notifications
                            </p>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton  onClick={()=>navigate('/admin/users')} className={location.pathname == '/admin/users' ? 'active' : ''} >
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText>
                        <p className={location.pathname == '/admin/users' ? 'my-0 fw-bold' : 'my-0'}>
                             Users
                            </p>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton  onClick={()=>navigate('/login')} >
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText>
                            <p className='my-0'>
                                 Logout
                            </p>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}

export default SideMenu