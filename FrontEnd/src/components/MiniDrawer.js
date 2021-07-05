import React from 'react';
import clsx from 'clsx';
import {BrowserRouter as Router,NavLink,Route,Switch} from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BallotIcon from '@material-ui/icons/Ballot';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import HowToVoteSharpIcon from '@material-ui/icons/HowToVoteSharp';
import CreateElection from '../vmscomponents/CreateElection1';
import ViewElection from '../vmscomponents/ViewElection';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ViewAllCandidates from '../vmscomponents/ViewAllCandidates';
import Voter from '../vmscomponents/Voter';
import Result from '../vmscomponents/Result';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../actions/auth';
import { useDispatch } from "react-redux";
import ResultId from '../vmscomponents/ResultId';
import UpdateElection from '../vmscomponents/UpdateElection1';
import Dashboard from '../vmscomponents/DashBoard';
import bgImage from '../images/background-sidebar.png'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',

  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
 
    
  },
  
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export default function MiniDrawer() {
 

  
  const classes = useStyles();
  const theme = useTheme();
 
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  
  const logOut = () => {
    dispatch(logout());
  };
  


  return ( <Router>
    <div className="bgAdmin">
    <div className={classes.root}>
      <CssBaseline />      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
         
          </IconButton>
          <Typography variant="h6" noWrap className="float-right">
              Dashboard
          </Typography>
         
         
        </Toolbar> 
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,

        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key="Dashboard">
              <ListItemIcon><DashboardOutlinedIcon /></ListItemIcon>
              <NavLink class="nav-link" exact to ="/Dashboard">Dashboard</NavLink>
            </ListItem>
        </List>
        <List>
            <ListItem button key="Elections">
              <ListItemIcon><HowToVoteSharpIcon /></ListItemIcon>
              <NavLink class="nav-link" exact to ="/ViewElection">Elections</NavLink>
            </ListItem>
        </List>
        <List>
            <ListItem button key="Candidates">
              <ListItemIcon><PeopleAltIcon /></ListItemIcon>
              <NavLink class="nav-link" exact to="/ViewAllCandidates">Candidates</NavLink> 
            </ListItem>
        </List>
        <List>
            <ListItem button key="Voters">
              <ListItemIcon><TouchAppIcon /></ListItemIcon>
              <NavLink class="nav-link" exact to="/Voter">Voters</NavLink> 
            </ListItem>
        </List>
        <List>
            <ListItem button key="Results">
              <ListItemIcon><BallotIcon /></ListItemIcon>
              <NavLink class="nav-link" exact to="/Result"> Result </NavLink>
            </ListItem>
        </List>
         <List>
            <ListItem button key="Logout">
              <ListItemIcon><ExitToAppIcon/> </ListItemIcon>
              <a href="/login" className="nav-link" onClick={logOut}>
                    Logout 
             </a>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
       
            <Switch>
              <Route path="/ViewElection" component={ViewElection}/>
              <Route path="/CreateElection" component={CreateElection}/>
              <Route path="/ViewAllCandidates" component={ViewAllCandidates}></Route>
              <Route path="/Voter" component={Voter}></Route>
              <Route path="/Result" component ={Result}/>
              <Route path ="/ResultId/:id" component={ResultId} />
              <Route path="/UpdateElection/:id" component={UpdateElection}/>
              <Route path="/Dashboard" component={Dashboard}/>
            </Switch>
        </Typography>
      </main>
    
    </div>
    </div>
    </Router>
  );
}
