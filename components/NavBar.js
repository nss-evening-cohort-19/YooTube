import * as React from 'react';
import Link from 'next/link';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Button as MuiButton } from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import { signIn, signOut } from '../utils/auth';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const { user } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link passHref href="/">
            <Navbar.Brand>CHANGE ME</Navbar.Brand>
          </Link>
          <Nav.Item>
            { user ? <MuiButton><VideoCallIcon className="videoCallIcon" /></MuiButton> : <></>}
          </Nav.Item>
          <Nav.Item className="ms-auto">
            { user ? <Button variant="danger" onClick={signOut}><LogoutIcon /></Button> : <Button variant="primary" onClick={signIn}><LoginIcon /></Button>}
          </Nav.Item>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton>Home</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Shorts</ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          { user ? <><ListItem><ListItemButton>Upload</ListItemButton></ListItem><ListItem><ListItemButton>Your Videos</ListItemButton></ListItem><ListItem><ListItemButton>Liked Videos</ListItemButton></ListItem></> : <ListItem><ListItemButton onClick={signIn}>Sign In</ListItemButton></ListItem>}
          <ListItem>
            <ListItemButton>Explore</ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
