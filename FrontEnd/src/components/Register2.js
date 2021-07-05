import React from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

const useStyles = (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
     acc:{
       marginTop : theme.spacing(10),
     },
      root: {
        minWidth: 275,
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
  });


class Register extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            age:'',
            mobileNumber:'',
            adharCardNumber:'',
            address:'',
            pincode:'',
            email:'',
            username:'',
            password:'',
            confirmPassword:'',
            gender:''


        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

   

    handleChange(event)
    {  
        event.preventDefault();
        this.setState({
            ...this.state,
            [event.target.name] : event.target.value
        })
        console.log(this.state.firstName);
        console.log(this.state.lastName);

    }

    handleSubmit(event)
    {   
       event.preventDefault();

       if(this.state.password === this.state.confirmPassword)
       {
        axios.post(`http://localhost:8080/register`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            mobileNumber: this.state.mobileNumber,
            adharCardNumber: this.state.adharCardNumber,
            address : this.state.address,
            pincode: this.state.pincode,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            gender: this.state.gender

          },)
          .then((ResponseData)=> {
              alert(ResponseData.data)
              console.log(ResponseData);
              this.props.history.replace("/login");
            })
            .catch((error)=>{
                 alert(error.response.data)
                console.log(error.response.data)})
            }
            else
            {
                alert("Password mismatch")
            }  
    }
    render()
    {   
      const { classes } = this.props;
        return(
            <Card className={classes.root}>
            <Grid container component="main" className={classes.root}>
  <CssBaseline />
  <Grid item xs={4} sm={3}className={classes.image} />
  <Grid item xs={12} sm={9}  component={Paper} elevation={6} square>
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      autoComplete="fname"
                   
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value ={this.state.lastName}
                      onChange={this.handleChange}
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      type="number"
                      name="age"
                      value={this.state.age}
                      onChange={this.handleChange}
                      autoComplete="age"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="Phone"
                      type="tel"
                      label="Phone"
                      name="mobileNumber"
                      value={this.mobileNumber}
                      onChange={this.handleChange}
                      autoComplete="Phone"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="number"
                      id="AdharCardNumber"
                      label="AdharCard Number"
                      name="adharCardNumber"
                      value={this.adharCardNumber}
                      onChange={this.handleChange}
                      autoComplete="AdharCardNumber"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      type="email"
                      label="Email Address"
                      name="email"
                      value={this.email}
                      onChange={this.handleChange}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      value={this.username}
                      onChange={this.handleChange}
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="Address"
                      label="Address"
                      name="address"
                      value={this.address}
                      onChange={this.handleChange}
                      autoComplete="Address"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="pincode"
                      label="PinCode"
                      name="pincode"
                      type="text"
                      value={this.pincode}
                      onChange={this.handleChange}
                      autoComplete="pincode"
                    />

                  </Grid>
                  <Grid item xs={12} sm={2}>
                 
                  <FormControl variant="outlined"required className="w-100">
                 
                    <InputLabel>Select Gender</InputLabel>
                    <Select
                      native
                      label="Age"
                      value={this.gender} name="gender" onChange={this.handleChange}
                    >
                      <option aria-label="None" value="" />
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="OTher">Other</option>
                    </Select>
                  </FormControl>
             
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      value={this.password}
                      onChange={this.handleChange}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      value={this.confirmPassword}
                      onChange={this.handleChange}
                      label="Confirm Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                </Grid>
                
                  <Grid item xs={12} sm={4}>
                  
                  <Grid item className="mt-4">
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                 
                  </Grid>
              </Grid>
               
              </form>






    </div>
  </Grid>
</Grid>
</Card>
                       
                      
 
        )
        }
    
}
export default withStyles(useStyles, { withTheme: true })(Register);
