import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import PanToolIcon from '@material-ui/icons/PanTool';
import { withStyles } from '@material-ui/core/styles';
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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import authHeader from "../services/auth-header";
const useStyles = (theme) => ({
    root: {
      height: '100vh',
    },
    image: {
        backgroundImage: 'url("../images/unnamed.jpg")',
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
});

  
class NominateCandidate extends React.Component{
  constructor(props){
    super(props);
    this.state={
      partyName :"",
      symbol:"",
      election:[],
      electionId:"",
      user:[],
        id:"",
     
        currentUser:JSON.parse(localStorage.getItem("user")),
        errors:{
          partyName:"",
          symbol:"",
        },
     
    };

    
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

 

  componentDidMount(){
    console.log("Data Aa raha hai")
    axios.get( `http://localhost:8080/election/listAllElection`, { headers: authHeader() })
    .then((ResponseData)=> {console.log(ResponseData);
      this.setState({users:ResponseData.data})})
      .catch((error)=>{console.log("Error in Election Data")})
  }
  
  handleChange(event)
{   const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'partyName': 
          errors.partyName = 
          value.length <2  
          ? 'Party Name must be 2 characters long!'
          : '';
      break;
      case 'symbol': 
      errors.symbol = 
          value.length <2  
          ? 'Symbol Name is mandatory!'
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
        [event.target.name] : event.target.value, 
    })

    console.log(this.state.partyName);
    console.log(this.state.symbol);
   
}

handleSubmit = async (event) =>{
  event.preventDefault();
  if(this.state.partyName === null && this.state.symbol === null || this.state.partyName.length === 0 && this.state.symbol.length === 0 )
  {     
      
      alert("All Fields are mandatory")
  }
else if(this.state.partyName.length === 0)
{
    alert("Party Name is Mandtory Field")
}
else if(this.state.partyName.length <= 2)
{
    alert("Party Name must be minimum 3 characters long!")
}
else if(this.state.symbol.length === 0)
{
    alert("Symbol is Mandtory Field")
}
else
{

  let candidates ={
    partyName:this.state.partyName,
    symbol:this.state.symbol,
    election:{
    electionId:this.props.match.params.id
    },
    user:{
      id:this.state.currentUser.id
    },
   
  };

await axios 
.post(`http://localhost:8080/candidate/nominate`, candidates,  { headers: authHeader() })
.then((data) =>{alert("Nominates Successfully!")})
.catch((error) => { alert(error.response.data);
});
};
}



    render(){
        const { classes } = this.props;
    return(
        
        <Grid container  maxWidth="md" component="main" className="bgNomination">
  <CssBaseline />
 
  <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
  <div className={classes.paper}>
      <Avatar className={classes.avatar}>
       <PanToolIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
      Nominate
      </Typography>

      <Form onSubmit={this.handleSubmit}>

          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text" 
              name="partyName"
              id="party" value={this.state.partyName} 
              onChange={this.handleChange}
              label="Party Name"
              autoFocus
            />
            <span className="text-danger">
                {this.state.errors.partyName}
            </span>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="symbol"
              id="symbol" 
              value={this.state.symbol} 
              onChange={this.handleChange}
              label="Symbol"
              type="text"
              autoFocus
            />
            <span className="text-danger">
                {this.state.errors.symbol}
            </span>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Nominate
            </Button>


        
        </Form>
 </div>
  </Grid>
  <Grid item xs={false} sm={4} md={7} >
     <Card elevation={6} square className="bgNomination">
        <CardHeader>
          <h1>  Hello  </h1> 
        </CardHeader>
        <CardMedia
        className="bgNomination"
        image="/images/unnamed.jpg"
        title="Paella dish"
      />
       <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>

    </Card> 

    </Grid>


  </Grid>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(NominateCandidate);



