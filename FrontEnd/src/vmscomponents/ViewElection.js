import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import authHeader from "../services/auth-header";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class ViewElection extends React.Component{
    constructor(props){
        super(props)
        this.state={
            election:[],
           
        }
        this.deleteElection = this.deleteElection.bind(this);
    }
    deleteElection=(electionId)=>{

        const Election_API_BASE_URL = 'http://localhost:8080/election/deleteElectionById'
         axios.put(Election_API_BASE_URL + '/' + electionId, {},{ headers: authHeader() }).then( res => {
            this.setState({election: this.state.election.filter(election => election.electionId !== electionId)});
        });
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
                        <td>{Elections.electionId}</td>
                        <td>{Elections.positionName}</td>
                        <td>{Elections.description}</td>
                        <td>{Elections.electionDate}</td>
                        <td>{Elections.startNominationDate}</td>
                        <td>{Elections.endNominationDate}</td>
                        <td><button  type="button" onClick={ () => this.deleteElection(Elections.electionId)} class="btn btn-danger"> <DeleteIcon /></button></td>
                        <td><NavLink exact to={`/UpdateElection/${Elections.electionId}`} button className="mr-4 btn btn-success"> <EditIcon/> </NavLink></td>

                    </tr>
                )
            }
        )
        return ( 
        <div> 
            <h2 align="center">Elections </h2>
            <NavLink type="button" exact to ="/CreateElection" class="btn btn-secondary btn-lg"> <i className="fa fa-plus" aria-hidden="true"></i> Add Election </NavLink>
            <br/>
            <table class="table table-striped table-light table-bordered" border="3">
                <thead>
                <tr>
                    <th scope="col" className = "bg-dark text-white" >Election Id</th>
                    <th scope="col" className = "bg-dark text-white">Positon Name</th>
                    <th scope="col" className = "bg-dark text-white">description</th>
                    <th scope="col" className = "bg-dark text-white">election Date</th>
                    <th scope="col" className = "bg-dark text-white">Starting date</th>
                    <th scope="col" className = "bg-dark text-white">Ending date</th>
                    <th scope="col" colspan = "2" className = "bg-dark text-white">Action</th>

                </tr>
                </thead>
                <tbody>
                {
                    listAllElection
                }
                </tbody>
                
               
                
            </table>
      </div>

      )

    }
}
export default ViewElection;