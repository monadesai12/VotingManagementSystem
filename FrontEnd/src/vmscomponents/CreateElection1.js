import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import React from "react";
import authHeader from "../services/auth-header";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

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


class CreateElection extends React.Component{
    constructor(props){
        super(props)
        this.state={
            election:[],
            positionName : "",
            description : "",
            electionDate : "",
            startNominationDate : "",
            endNominationDate : "",

            errors:{
              positionName:"",
              description : "",
              electionDate : "",
              startNominationDate : "",
              endNominationDate : "",
            }
           
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this); 
    
  }

  handleChange(event)
    {  
        event.preventDefault();

        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
          case 'positionName': 
              errors.positionName = 
              value.length <2  || value.length >30
              ? 'Position Name must be 2 characters long!'
              : '';
          break;
          case 'description': 
          errors.description = 
              value.length <1 
              ? 'Description cannot be null'
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

        console.log(this.state.positionName)

    }

handleSubmit(event){
event.preventDefault()


axios.post('http://localhost:8080/election/createElection', {
    positionName : this.state.positionName,
    description : this.state.description,
    electionDate : this.state.electionDate,
    startNominationDate : this.state.startNominationDate,
    endNominationDate : this.state.endNominationDate
    }, { headers: authHeader() })
    .then((ResponseData)=> {
        alert(ResponseData.data)
        console.log(ResponseData);
        this.props.history.replace("ViewElection")
      })
      .catch((error)=>{
        var count = Object.keys(error.response.data)
         var values = Object.values(error.response.data)

         if(count.length===5)
         {
           alert("All fields are mandatory")
         }
         else if(error.response.data.positionName)
         {
          alert(error.response.data.positionName)
         }
         else if(error.response.data.description)
         {
          alert(error.response.data.description)
         }
         else if(error.response.data.electionDate)
         {
          alert(error.response.data.electionDate)
         }
         else if(error.response.data.startNominationDate)
         {
            alert(error.response.data.startNominationDate)
         }
         else if(error.response.data.endNominationDate)
         {
            alert(error.response.data.endNominationDate)
         }
         else if(error)
         {
           alert("Position Name should be unique")
         }
         
      })
     
    
    
}
render(){
    const { classes } = this.props;
return (
    
    <Card className={classes.root}>
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <CreateNewFolderIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Create Election
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                    autoComplete="fname"
                    variant="outlined"
                    required
                    fullWidth
                    label="Position Name"
                    type="text" 
                    name="positionName"  
                    onChange={this.handleChange} 
                    value={this.state.positionName} 
                    id="positionName"
                    autoFocus
                   
                    />
                    <span className="text-danger">
                      {this.state.errors.positionName}
                    </span>
                  
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text" 
                    name="description"  
                    label="description"
                    onChange={this.handleChange} 
                    value={this.state.description} 
                    id="description"
                    />
                     <span className="text-danger">
                      {this.state.errors.description}
                    </span>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    fullWidth
                    label="Election Date"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    autoFocus
                    required
                    name="electionDate"  
                    onChange={this.handleChange} 
                    value={this.state.electionDate} id="dateE"
                    />
                     <span className="text-danger">
                      {this.state.errors.electionDate}
                    </span>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    fullWidth
                    label="Start Nomination Date"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    autoFocus
                    required
                    name="startNominationDate"  
                    onChange={this.handleChange} 
                    value={this.state.startNominationDate}

                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    fullWidth
                    label="End Nomination Date"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    autoFocus
                    required
                    name="endNominationDate"  
                    onChange={this.handleChange} 
                    value={this.state.endNominationDate} id="dateEnd"
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
                 Submit
                </Button>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                
                
                </Grid>
            </Grid>
            
            </form>
            </div>

            </Container>
            </Card>
);
}
}
export default withStyles(useStyles, { withTheme: true })(CreateElection);
