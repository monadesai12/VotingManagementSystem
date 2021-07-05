import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import authHeader from '../services/auth-header';


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
     }
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
            currentUser:JSON.parse(localStorage.getItem("user")),
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

    componentDidMount()
    {
          console.log("Update User Profile");
          axios.get(`http://localhost:8080/viewvoterByid/${this.state.currentUser.id}`,  { headers: authHeader() })
          .then((responseUserData)=>{console.log(responseUserData);
              let user=responseUserData.data
              console.log(responseUserData.data)
          this.setState({
              firstName:user.firstName,
              lastName:user.lastName,
              age:user.age,
              mobileNumber:user.mobileNumber,
              adharCardNumber:user.adharCardNumber,
              address:user.address,
              pincode:user.pincode,
              email:user.email,
              username:user.username,
              gender:user.gender,
              password:user.password
                // users:responseUserData.data,
          }) })
          .catch((error)=>{console.log("Some error in user(voter) read data ");
        })
        console.log("soniya")
        console.log(this.state.currentUser.id)
        console.log(this.state.firstName)
        console.log(this.state.pincode)
  
        
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
              ? 'First Name must be atleast 2 characters long!'
              : '';
          break;
          case 'lastName': 
          errors.lastName = 
              value.length <2  || value.length >30
              ? 'Last Name must be atleast 2 characters long!'
              : '';
          break;
          
          case 'mobileNumber': 
          errors.mobileNumber = 
              value.length <10 || value.length >10
              ? 'MobileNumber must be 10 digit long!'
              : '';
          break;
         
          case 'pincode': 
          errors.pincode = 
              value.length <6 || value.length > 6
              ? 'Pincode must be 6 digit long!'
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

    handleSubmit(event)
    {   
       event.preventDefault();

        axios.put(`http://localhost:8080/updateUser/${this.state.currentUser.id}`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          
            mobileNumber: this.state.mobileNumber,
           
            address : this.state.address,
            pincode: this.state.pincode,
            email: this.state.email,
          

          }, { headers: authHeader() })
          .then((ResponseData)=> {
              alert(ResponseData.data)
              console.log(ResponseData);
             
            })
            .catch((error)=>{
                
              console.log(error.response.data)
              
                })
              }
         
    
    render()
    {   
      const { classes } = this.props;
        return(
            <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                 Profile
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
                      placeholder={this.state.firstName}
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
                      placeholder={this.state.lastName}
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
                      disabled
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
                      placeholder={this.state.mobileNumber}
                      value={this.state.mobileNumber}
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
                      disabled
                      value={this.state.adharCardNumber}
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
                      value={this.state.email}
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
                      value={this.state.username}
                      onChange={this.handleChange}
                      disabled
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
                      placeholder={this.state.address}
                      value={this.state.address}
                      onChange={this.handleChange}
                      autoComplete="Address"
                    />
                     <span className="text-danger"> 
                    {this.state.errors.address}
                    </span>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="string"
                      id="pincode"
                      label="PinCode"
                      name="pincode"
                      value={this.state.pincode}
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
                      value={this.state.gender} onChange={this.handleChange}
                      disabled
                    >
                      <option aria-label="None" value="" />
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="OTher">Other</option>
                    </Select>
                  </FormControl>
             
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
                  Update
                </Button>
                </Grid>
                
                  <Grid item xs={12} sm={4}>
                  
                  </Grid>
              </Grid>
               
              </form>
            </div>

          </Container>
           
                                         
 
        )
        }
    
}
export default withStyles(useStyles, { withTheme: true })(Register);
