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
            gender:'',
            errors:{
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
              gender:'',

            }


        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

   

    handleChange(event)
    {  
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
          case 'firstName': 
              errors.firstName = 
              value.length <2  || value.length >30
              ? 'First Name must be 2 characters long!'
              : '';
          break;
          case 'lastName': 
          errors.lastName = 
              value.length <2  || value.length >30
              ? 'Last Name must be 2 characters long!'
              : '';
          break;
          case 'username': 
          errors.username = 
              value.length <2 || value.length >30
              ? 'UserName must be 2 characters long!'
              : '';
          break;
          case 'adharCardNumber': 
          errors.adharCardNumber = 
              value.length < 12  || value.length >12 
              ? 'AdharCardNumber must be 12 digit long!'
          
              : '';
          break;
          case 'mobileNumber': 
          errors.mobileNumber = 
              value.length <10 || value.length >10
              ? 'MobileNumber must be 10 digit long!'
              : '';
          break;
          case 'password': 
          errors.password = 
              value.length <2 || value.length >30
              ? 'Password must be atleast 2 characters long!'
              : '';
          break;
          case 'pincode': 
          errors.pincode = 
              value.length <6 || value.length > 6
              ? 'Pincode must be 6 digit long!'
              : '';
          break;
          case 'gender': 
          errors.gender = 
              value.length < 0
              ? 'Gender is mandatory field!'
              : '';
          break;
          case 'age': 
          errors.age = 
              value.length < 0
              ? 'Age cannot be null or 0!'
              : '';
          break;
        
          default:
          break;
       }
  
          this.setState({errors, [name]: value}, ()=> {
              console.log(errors)
          });

        this.setState({
            ...this.state,
            [event.target.name] : event.target.value
        })
        console.log(this.state.firstName);
        console.log(this.state.lastName);

    }
    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({errors:nextProps.errors});
      }
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

                  console.log(error.response.data)
                 if(error.response.data.firstName && error.response.data.lastName && error.response.data.adharCardNumber &&
                   error.response.data.mobileNumber && error.response.data.password && error.response.data.username && error.response.data.pincode
                   && error.response.data.email)
                   {
                      alert("All fields are mandatory")
                   }
                   else if(error.response.data.firstName)
                    {
                       alert(error.response.data.firstName)
                    }
                    else if(error.response.data.lastName)
                    {
                       alert(error.response.data.lastName)
                    }
                    else if(error.response.data.mobileNumber)
                    {
                       alert(error.response.data.mobileNumber)
                    }
                    else if(error.response.data.adharCardNumber)
                    {
                       alert(error.response.data.adharCardNumber)
                    }
                    else if(error.response.data.email)
                    {
                       alert(error.response.data.email)
                    }
                    
                    else if(error.response.data.username)
                    {
                       alert(error.response.data.username)
                    }
                   
                    else if(error.response.data.pincode)
                    {
                       alert(error.response.data.pincode)
                    }
                    else if(error.response.data.gender)
                    {
                       alert(error.response.data.gender)
                    }
                    else if(error)
                    {
                      alert("AadharCardNumber, username or email already exist")
                    }
              })
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
            <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
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
                    <span className="text-danger"> 
                    {this.state.errors.firstName}
                    </span>
                    
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
                     <span className="text-danger"> 
                    {this.state.errors.lastName}
                    </span>
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
                     <span className="text-danger"> 
                    {this.state.errors.age}
                    </span>
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
                     <span className="text-danger"> 
                    {this.state.errors.mobileNumber}
                    </span>
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
                     <span className="text-danger"> 
                    {this.state.errors.adharCardNumber}
                    </span>
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
                     <span className="text-danger"> 
                    {this.state.errors.username}
                    </span>
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
                     <span className="text-danger"> 
                    {this.state.errors.pincode}
                    </span>

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
                      <span className="text-danger"> 
                    {this.state.errors.password}
                    </span>
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

          </Container>
           </Card>
                           
                       
                      
 
        )
        }
    
}
export default withStyles(useStyles, { withTheme: true })(Register);
