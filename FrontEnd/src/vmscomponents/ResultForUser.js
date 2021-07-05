import axios from "axios";
import React from "react";
import {NavLink} from "react-router-dom";
import authHeader from "../services/auth-header";

class ResultForUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            election:[],    
        }
        this.AnnounceResult=this.AnnounceResult.bind(this);   
    }

    AnnounceResult = (electionId)=>{

        const URL = 'http://localhost:8080/election/AnnounceResult'
         axios.put(URL + '/' + electionId, { headers: authHeader() }).then( res => {
             console.log(res)
        });
       
    }

  

    componentDidMount(){
        console.log("msg")
        axios.get(`http://localhost:8080/election/ViewResultByUser`, { headers: authHeader() })
        .then((ResponseData)=> {console.log(ResponseData);
        this.setState({election:ResponseData.data})})
        .catch((error)=>{console.log("Error in election Data")})
    }

    render()
    {
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
                        <td> <NavLink exact to={`/ResultId/${Elections.electionId}`} button className="btn btn-primary">View Result</NavLink></td>
                       
                    </tr>
                )
            }
        )
        return (
        <div className="container-sm bgResult">
        <h2 align="center" > Results </h2>
        <table class="table table-striped table-hover table-light" border="2">
        <thead>
          <tr>
            <th scope="col md-2" className="bg-dark text-white">Positon Name</th>
            <th scope="col md-2" className="bg-dark text-white">description</th>
            <th scope="col md-2" className="bg-dark text-white">election Date</th>
            <th scope="col md-2" className="bg-dark text-white">Starting date</th>
            <th scope="col md-2" className="bg-dark text-white">Ending date</th>
            <th colspan="2" scope="col md-2" className="bg-dark text-white">Action</th>
          </tr>
           
        </thead>
        <tbody>
        { listAllElection }
        </tbody>
          
      </table>
      </div>)

    }
}
export default ResultForUser;