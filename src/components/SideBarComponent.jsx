import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GroupIcon from '@material-ui/icons/Group';
import BacklogComponent from './BacklogComponent';
import DashboardComponent from './DashboardComponent';
import ReportsComponent from './ReportsComponent';
import TeamsComponent from './TeamsComponent';
import SettingsComponent from './SettingsComponent';
import { Box, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export default function SideBarComponent () {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
 
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <Box>
      <Tooltip title="Expand Sidebar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <CssBaseline />
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>

        <div className={classes.drawerHeader}>
          {/* <h4>Task Managemet System</h4> */}
          <Typography>Task Managemet System</Typography>
          <Tooltip title="Collapse Sidebar">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </div>
        <Divider />

        <List component="nav" aria-label="main mailbox folders">
            <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon><DescriptionIcon /></ListItemIcon>
                <ListItemText primary="Backlog" />
            </ListItem>

            <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}>
                <ListItemIcon>
                    <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>

            <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon>
                    <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Teams" />
            </ListItem>

            <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
      </List>
        {/* <Divider /> */}
      {/* <HeaderComponent/> */}
      </Drawer>
      
      

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        
        
        
        {selectedIndex === 0 ? <BacklogComponent/> : null}
        {selectedIndex === 1 ? <DashboardComponent/> : null}
        {selectedIndex === 2 ? <ReportsComponent/> : null}
        {selectedIndex === 3 ? <TeamsComponent/> : null}
        {selectedIndex === 4 ? <SettingsComponent/> : null}
      </main>
    </div>
  );
}