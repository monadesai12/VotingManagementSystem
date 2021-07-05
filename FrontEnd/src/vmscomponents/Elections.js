import axios from "axios";
import React  from "react";
import {NavLink} from "react-router-dom";
import authHeader from "../services/auth-header";
class Elections extends React.Component{
    constructor(props){
        super(props)
        this.state={
            election:[], 
        }
       
        
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
                    
                    <div class="card" key={Elections.electionId}>
                    <h5 class="card-header bg-secondary text-white">Position Name : {Elections.positionName}</h5>
                        <div class="card-body">
                            <h5 class="card-title">Election On : {Elections.electionDate}</h5>
                            <p class="card-text">{Elections.description} </p>
                            <br/>
                            Election Nomination Time  started at : {Elections.startNominationDate}<br/>
                            Elecion Nomination will end at :  {Elections.endNominationDate}
                            <br/><br/>
                            
                            <NavLink exact to ={`/NominateCandidate/${Elections.electionId}`}class="btn btn-outline-info">Nominate as Candidate</NavLink>
                        </div>
                    </div>
                  
                )
            }
        )
        return (
            <div className="container-sm">
          
            {  listAllElection }
          
        </div>
      )

    }
}
export default Elections;