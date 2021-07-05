import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router,NavLink,Route} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import UpdateUser from '../vmscomponents/UpdateUser';
import ResultId from '../vmscomponents/ResultId';
import NominateCandidate1 from '../vmscomponents/NominateCandidate1';
import ViewElections from '../vmscomponents/ViewElections';
import ViewAllCandidates from '../vmscomponents/ViewAllCandidates';
import ViewCandidate from '../vmscomponents/ViewCandidate';
import Elections from '../vmscomponents/Elections';
import { logout } from '../actions/auth';
import { useDispatch } from "react-redux";
import ResultForUser from '../vmscomponents/ResultForUser';
import Home from './Home';



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function PrimarySearchAppBar() {
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();
  
  const logOut = () => {
    dispatch(logout());
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <NavLink class="nav-link" exact to="/UpdateUser/"> Profile </NavLink>
      </MenuItem>
      </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>


      <MenuItem>
        <IconButton  color="inherit">
          <Badge  color="secondary">
            <ExitToAppIcon />
          </Badge>
        </IconButton>
        <a href="/login" className="nav-link" onClick={logout}>
                  Logout
          </a>
      </MenuItem>


    </Menu>
  );

  return (
      <Router>
        <div className="bgElection">
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          <img className="img" src="https://st.depositphotos.com/1007712/1367/v/950/depositphotos_13673759-stock-illustration-vote-text-with-check-mark.jpg" />

    
          <Typography className="py-8 ml-4 pl-4" variant="h6" noWrap >
            Voting Management System
          </Typography >

          <div className="py-8 ml-4 mr-2">
            <NavLink className="nav-link text-light" exact to="/home"> Home </NavLink>
          </div>
          <div className="py-8 mr-2">
            <NavLink className="nav-link text-light" exact to ="/ViewElection">Elections</NavLink>
          </div> 

          <div className="py-8 mr-2">
            <NavLink className="nav-link text-light" exact to="/ResultForUser"> Result </NavLink>
          </div>

          <div className="py-8 mr-2">
            <NavLink className="nav-link text-light" exact to="/Elections"> Nominate </NavLink>
          </div>
        
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
      
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
           
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            
          </div>
          <div className="py-8 mr-4">
            <a href="/login" className="nav-link text-light" onClick={logOut}>
                    Logout <ExitToAppIcon/>
            </a>
          </div>
        </Toolbar>


      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Typography paragraph>
     
     
            <Route path="/ResultId/:id" component ={ResultId}/>
            <Route path="/UpdateUser" component={UpdateUser} />
            <Route path="/ViewElection" component={ViewElections}></Route>
            <Route path="/ViewAllCandidates" component={ViewAllCandidates}></Route>
            <Route path="/ViewCandidate/:id" component ={ViewCandidate}/>
            <Route path="/Elections" component={Elections} />
            <Route path="/NominateCandidate/:id" component={NominateCandidate1}></Route>
            <Route path="/ResultForUser" component ={ResultForUser}/>
            <Route path="/home" component ={Home}/>
    
    
      </Typography>
    </div>
    </div>
    </Router>
  );
}
