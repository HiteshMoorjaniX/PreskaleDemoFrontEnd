import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logo from '../preskale.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Appbar() {

  const path = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAccount = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleProfile = () => {
    setAnchorEl(null)
  };

  const handleLogout = () => {
    setAnchorEl(null)
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNewProduct = () => {
    path.push('/newproduct');
  };

  const handleCustomer = () => {
    path.push('/customer');
  };

  const handleHome = () => {
    console.log("homeee");
    path.push('/');
  }

  return (
    <div>
      <div className={classes.root}>

        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Preskale Demo App
            </Typography>


            <div>
              <Button style={{ color: 'white' }} onClick={handleCustomer} >
                Customer</Button>
            </div>


            <div>
              <Button style={{ color: 'white' }} onClick={handleNewProduct} >
                New Product</Button>
            </div>

            <div>

              <Button style={{ color: 'white' }}
                aria-controls="simple-menu" aria-haspopup="true"
                onClick={handleAccount}
              >
                <AccountCircleIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleProfile}
                >Profile</MenuItem>

                <MenuItem
                  onClick={handleLogout}
                >
                  Logout</MenuItem>
              </Menu>
            </div>

          </Toolbar>
        </AppBar>


        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="Preskale" onClick={handleHome}>
              <ListItemIcon>
                <Avatar src={Logo} />
              </ListItemIcon>
              <ListItemText primary="Preskale" />
            </ListItem>
            <ListItem button key="Home" onClick={handleHome}>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="Setting">
              <ListItemIcon>
                <SettingsIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

          </List>
        </Drawer>
      </div>
    </div>
  );
}
