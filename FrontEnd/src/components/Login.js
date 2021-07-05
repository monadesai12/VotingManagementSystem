import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
     backgroundImage: 'url(https://static9.depositphotos.com/1007566/1177/v/950/depositphotos_11770563-stock-illustration-hands-up.jpg)',
    // backgroundImage: 'url(https://d1csarkz8obe9u.cloudfront.net/posterpreviews/your-vote-is-your-voice-design-template-4b0d3243f3c64a0dec8c9dc2e03534a9_screen.jpg?ts=1602452288)',
     // backgroundImage: 'url(https://i.pinimg.com/originals/af/94/52/af9452bfcaadea8a9f677e50e3189a9c.jpg)',

      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

const Login = (props) => {

  const classes = useStyles();

  const form = useRef();
  const checkBtn = useRef();
  
  const { user: currentUser } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCustomerBoard,setShowCustomerBoard] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setShowManagerBoard(currentUser.roles.includes("ROLE_CANDIDATE"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowCustomerBoard(currentUser.roles.includes("ROLE_USER"));
    }
  }, [currentUser]);
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          if(showAdminBoard){ 
          props.history.push("/admin");
          window.location.reload();}
          else if(showManagerBoard){
            props.history.push("/candidate");
          window.location.reload();
          }
          else if(showCustomerBoard){
            props.history.push("/user");
            window.location.reload();
          }
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
   
  };

  if (isLoggedIn) {
    if(showAdminBoard){
    return <Redirect to="/admin" />;}
    else if(showManagerBoard){
      return <Redirect to="/candidate" />;
    }
    else if(showCustomerBoard){
      return <Redirect to="/user" />;
    }
  }

  return ( <Grid container component="main" className={classes.root}>
  <CssBaseline />
  <Grid item xs={false} sm={4} md={7} className={classes.image} />
  <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Form onSubmit={handleLogin} ref={form}>

          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="password"
              type="password"
              onChange={onChangePassword}
              validations={[required]}
              autoComplete="password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </Button>


          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          <Grid container>
            
              <Grid item>
                <Link href="/signIn" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </Form>
    </div>
  </Grid>
</Grid>
);
   
};

export default Login;
