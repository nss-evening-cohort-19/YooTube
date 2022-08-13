import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from 'next/link';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ExploreIcon from '@mui/icons-material/Explore';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
  Avatar, Button as MuiButton, ListItemText, Menu, MenuItem,
} from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image';
import svgicon from '../icons/icons8-youtube.svg';
import { useAuth } from '../utils/context/authContext';
import { signIn, signOut } from '../utils/auth';
import SearchBar from './SearchBar';
import { getAllPublicVideoFirebaseKeys } from '../api/videoData';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const { user } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [randomVideoFirebaseKey, setRandomVideoFirebaseKey] = useState('');

  const getRandomVideoFirebaseKey = () => {
    getAllPublicVideoFirebaseKeys().then((firebaseKeysArray) => {
      setRandomVideoFirebaseKey(firebaseKeysArray[Math.floor(Math.random() * firebaseKeysArray.length)]);
    });
  };

  useEffect(() => {
    getRandomVideoFirebaseKey();
  }, [randomVideoFirebaseKey]);

  const handleTheClick = () => {
    getRandomVideoFirebaseKey();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar style={{ background: '#ffffff' }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon className="drawerIcon" />
          </IconButton>
          <Link passHref href="/">
            <Navbar.Brand>
              <Image src={svgicon} alt="youtube" />
              <h1 className="yootubeText">YooTube</h1>
            </Navbar.Brand>
          </Link>
          <SearchBar />
          <Nav className="searchBar justify-content-end">
            <Link passHref href="/video/new">
              <Nav.Item className="d-flex">
                { user ? <MuiButton><VideoCallIcon className="videoCallIcon" /></MuiButton> : <></>}
              </Nav.Item>
            </Link>
            <Nav.Item className="d-flex">
              { user
                ? (
                  <div>
                    <MuiButton
                      id="demo-positioned-button"
                      aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <Avatar alt={user.displayName} src={user.photoURL} />
                    </MuiButton>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link href="/" passHref>
                          <MuiButton onClick={signOut}><LogoutIcon /> Sign Out</MuiButton>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </div>
                )
                : (
                  <MuiButton variant="primary" onClick={signIn}><LoginIcon className="drawerIcon" /></MuiButton>
                )}
            </Nav.Item>
          </Nav>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link passHref href="/">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>Home</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link passHref href={`/video/${randomVideoFirebaseKey}`}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={handleTheClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <GroupWorkIcon />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>Shorts</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

        <Divider />

        <List>
          { user
            ? (
              <>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <Link passHref href="/library">
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <VideoLibraryIcon />
                      </ListItemIcon>
                      <ListItemText sx={{ opacity: open ? 1 : 0 }}>Library</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <Link passHref href="/video/new">
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <AddAPhoto />
                      </ListItemIcon>
                      <ListItemText sx={{ opacity: open ? 1 : 0 }}>Upload</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <Link passHref href="/yourVideos">
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <PlayCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText sx={{ opacity: open ? 1 : 0 }}>Your Videos</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <Link passHref href="/likedVideos">
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <ThumbUpOffAltIcon />
                      </ListItemIcon>
                      <ListItemText sx={{ opacity: open ? 1 : 0 }}>Liked Videos</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            )
            : (
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={signIn}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }}>Sign In</ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link passHref href="/explore">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ExploreIcon />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>Explore</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

      </Drawer>
    </Box>
  );
}
