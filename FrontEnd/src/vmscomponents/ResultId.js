import { IndeterminateCheckBoxOutlined } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import authHeader from "../services/auth-header";

const useStyles = (theme) => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  

class ResultId extends React.Component
{
    constructor(props){
        super(props);
        this.state={candidate:[],
            resultName:"",
            winnerCandidate:"",
            winnerUser:"",
            winnerfirstName:'',
            winnerlastName:'',
            winnerPartyName:'',
            winnerSymbol:'',
            winnerVotes:''

        };
        
    }

    componentDidMount(){
        console.log("msg")
        axios.get(`http://localhost:8080/voting/resultByEId/${this.props.match.params.id}`, { headers: authHeader() })
        .then((ResponseData)=> {console.log(ResponseData);
        this.setState({candidate:ResponseData.data})})
        .catch((error)=>{console.log("Error in election Data")})

        // declare winner
        axios.get(`http://localhost:8080/voting/winnerByEId/${this.props.match.params.id}`, { headers: authHeader() })
        .then((ResponseData)=> {console.log(ResponseData);
            console.log(ResponseData.data.votes)
            var count = Object.values(ResponseData.data)
           
        this.setState({
            winnerfirstName : Object.values(ResponseData.data)[9].firstName,
            winnerlastName : Object.values(ResponseData.data)[9].lastName,
            winnerPartyName : Object.values(ResponseData.data.partyName),
            winnerSymbol : Object.values(ResponseData.data.symbol),
            winnerVotes : ResponseData.data.votes,
            

            winnerCandidate:ResponseData.data,
            
            winnerUser :  JSON.stringify(ResponseData.data.user)
           })})
          

                     

       
        // .catch((error)=>{console.log("Error in election Data")})

        //     console.log("soniya" + this.state.winnerUser)
    }


    render()
    {   
        // var winner = this.state.winnerCandidate.map(
        //    (winCan) =>
        //     {
        //         return(
        //             <td>{winCan.candidateId} </td>
        //         )
        //     }
        // )
        const { classes } = this.props;
        var index = this.state.winnerUser.indexOf('firstName') + 12
        var endIndex = this.state.winnerUser.indexOf('lastName')
        var index2 = this.state.winnerUser.indexOf('lastName') + 11
        var endIndex2 = this.state.winnerUser.indexOf('age')

        var result=this.state.candidate.map(
        (Candidates,index)=>
        {this.resultName=Candidates.election.positionName
            return (
                <tr key={Candidates.candidateId}>
                    <td>{Candidates.user.firstName} {Candidates.user.lastName}</td>
                    <td>{Candidates.user.gender} </td>
                    <td>{Candidates.user.age} </td>
                    <td>{Candidates.partyName}</td>
                    <td>{Candidates.symbol}</td>
                    <td>{Candidates.votes}</td>
                    </tr>
            )
        }
    )
        return(
            <div className="py-8 container-sm">
            <h2 align="center"  > Results For {this.resultName}</h2>
            <table class="table table-striped table-light" border="3">
                <thead>
                    <tr>
                        <th scope="col" className = "bg-dark text-white" >Canidadate Name</th>
                        <th scope="col" className = "bg-dark text-white" >Party Name</th>
                        <th scope="col" className = "bg-dark text-white" >Gender</th>
                        <th scope="col" className = "bg-dark text-white" >Age</th>
                        <th scope="col" className = "bg-dark text-white" >Symbol</th>
                        <th scope="col" className = "bg-dark text-white" >Number of Votes</th>    
                    </tr>  
                       
                </thead>
                <tbody>
                { result }
                </tbody>
            </table>


              <Card>
                <CardContent>
                    <Typography className="text-success" gutterBottom>
                      <h1>Winner For this {this.resultName} Election</h1>
                    </Typography>
                    <Typography variant="h5" component="h2">
                       {this.state.winnerfirstName} &nbsp;
                       {this.state.winnerlastName}  &nbsp; belongs to &nbsp;
                       {this.state.winnerPartyName} &nbsp; symbol is  &nbsp;
                       {this.state.winnerSymbol} &nbsp; was winner of the {this.resultName} election with total &nbsp;
                       {this.state.winnerVotes} votes
                      
                        {/* {this.state.winnerUser.slice(index, endIndex-3)} &nbsp;
                        {this.state.winnerUser.slice(index2, endIndex2-3)} */}
                    </Typography>
                  
                </CardContent>
                </Card>
                
               
              
              
                
        </div>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(ResultId);

//