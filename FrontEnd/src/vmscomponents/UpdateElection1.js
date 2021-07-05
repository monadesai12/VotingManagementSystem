import axios from "axios";
import React from "react";
import authHeader from "../services/auth-header";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import EditIcon from '@material-ui/icons/Edit';

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

class UpdateElection extends React.Component{

    constructor(props){
        super(props)
        this.state={
            election:[],
            electionId:'',
            positionName : '',
            description : '',
            electionDate : '',
            startNominationDate : '',
            endNominationDate : '',
            errors:{
                positionName:"",
                description : "",
                electionDate : "",
                startNominationDate : "",
                endNominationDate : "",
              }
        }
        // this.changeElectionDate = this.changeElectionDate.bind(this);
        // this.changeStartNominationDate = this.changeStartNominationDate.bind(this);
        // this.changeEndNominationDate = this.changeEndNominationDate.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    

  }
//   changeElectionDate(event) {
//     this.setState({
//         electionDate: event.target.value
//     })

//     console.log(this.state.electionDate)
// }
// changeStartNominationDate(event) {
//     this.setState({
//         startNominationDate: event.target.value
//     })
// }
// changeEndNominationDate(event) {
//     this.setState({
//         endNominationDate: event.target.value
//     })
// }
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

}


  componentDidMount(){
    console.log("msg")
    
    axios.get(`http://localhost:8080/election/viewElectionById/${this.props.match.params.id}`, { headers: authHeader() })
    .then((ResponseData)=> {console.log(ResponseData);
    console.log("update"+this.props.match.params.electionId)
    this.setState({election:ResponseData.data, 
        description : ResponseData.data.description})})
    .catch((error)=>{console.log("Error in election Data"+ this.props.match.params.electionId)})
  }


update(event) {

        const url = `http://localhost:8080/election/updateElection/${this.props.match.params.id}`;
        event.preventDefault();
        axios.put(url, {
            positionName: this.state.election.positionName,
            description: this.state.description,
            electionDate: this.state.electionDate,
            startNominationDate: this.state.startNominationDate,
            endNominationDate: this.state.endNominationDate,
        },  { headers: authHeader() }).then((responseEmpData) => {
            console.log(responseEmpData);
            alert("Updated Successfully");
        }).catch((error) => {
            console.log(error.response.data);
            if(error.response.data.description)
            {
                alert(error.response.data.description)
            }
            else if(error.response.data.electionDate)
            {  alert(error.response.data.electionDate)
            }
            else if(error.response.data.startNominationDate)
            {
                alert(error.response.data.startNominationDate)
            }
            else if(error.response.data.endNominationDate)
            {
                alert(error.response.data.endNominationDate)
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
                    <EditIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Update Election
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.update}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                        
                        variant="outlined"
                       
                        fullWidth
                        label="Position Name"
                        type="text" 
                        name="positionName"
                        disabled value={this.state.election.positionName}  
                        id="positionName"
                       
                        />
          
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        variant="outlined"
                        fullWidth
                        type="text" 
                        name="description"  
                        label="description"
                        value={this.state.description}
                        onChange={this.handleChange} 
                       
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
                        //onChange={this.changeElectionDate}
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
                        //onChange={this.changeStartNominationDate} 
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
                        defaultValue="2017-05-24T10:30"
                        //defaultValue={this.state.election.endNominationDate}  
                        onChange={this.handleChange} 
                        //onChange={this.changeEndNominationDate}
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
    export default withStyles(useStyles, { withTheme: true })(UpdateElection);