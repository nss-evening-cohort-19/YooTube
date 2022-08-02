import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import Signin from './Signin';
import { signIn } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function SideBar() {
  const { user } = useAuth();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
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
