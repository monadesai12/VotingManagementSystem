import axios from "axios";
import React  from "react";
import {NavLink} from "react-router-dom";
import authHeader from "../services/auth-header";
import VisibilityIcon from '@material-ui/icons/Visibility';
class ViewElections extends React.Component{
    constructor(props){
        super(props)
        this.state={
            election:[], 
        }
        this.deleteElection = this.deleteElection.bind(this);
        
    }

    deleteElection=(electionId)=>{

        const Election_API_BASE_URL = 'http://localhost:8080/election/deleteElectionById'
         axios.put(Election_API_BASE_URL + '/' + electionId, { headers: authHeader() }).then( res => {
            this.setState({election: this.state.election.filter(election => election.electionId !== electionId)});
        });
        //this.props.history.replace("allusers")
    }

    componentDidMount(){
        console.log("msg")
        axios.get(`http://localhost:8080/election/listAllElection`, { headers: authHeader() })
        .then((ResponseData)=> {console.log(ResponseData);
        this.setState({election:ResponseData.data})})
        .catch((error)=>{console.log("Error in election Data")})
    }
    render(){

        var listAllElection= this.state.election.map(
            (Elections,index)=>
            {
                return (
                  
                    <tr key={Elections.electionId}>
                        <td>{Elections.positionName}</td>
                        <td>{Elections.description}</td>
                        <td>{Elections.electionDate}</td>
                        <td>{Elections.startNominationDate}</td>
                        <td>{Elections.endNominationDate}</td>
                        <td> <NavLink exact to={`/ViewCandidate/${Elections.electionId}`} button className="btn btn-primary"> <VisibilityIcon/> </NavLink></td>
                        
                    </tr>
                )
            }
        )
        return (
            <div  className="container-sm bgElection">
            <h2 align="center" > Elections </h2>
            <table class="table table-striped table-hover table-light" border="3">
            <thead>
            <tr>
                <th scope="col" className = "bg-dark text-white">Positon Name</th>
                <th scope="col" className = "bg-dark text-white">description</th>
                <th scope="col" className = "bg-dark text-white">election Date</th>
                <th scope="col" className = "bg-dark text-white">Starting date</th>
                <th scope="col" className = "bg-dark text-white">Ending date</th>
                <th colspan="2" scope="col" className = "bg-dark text-white">Action</th> 
            </tr>  
            </thead> 
           
          

            <tbody>
            {  listAllElection }
            </tbody>
            </table>
        </div>
      )

    }
}
export default ViewElections;

//