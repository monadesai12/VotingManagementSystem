import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLight :4
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

        <img className="img mr-4" src="https://st.depositphotos.com/1007712/1367/v/950/depositphotos_13673759-stock-illustration-vote-text-with-check-mark.jpg" />

          <Typography variant="h6" className={classes.title}>
              
            Voting Management System
          </Typography>
          <Link to={"/login"} className="nav-link text-light">
                Login
          </Link>
          <Link to={"/signIn"} className="nav-link text-light">
             Register
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
