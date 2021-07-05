import axios from "axios";
import React from "react";
import authHeader from "../services/auth-header";

class ViewCandidate extends React.Component
{
    constructor(props){
        super(props);
        this.state={candidate:[],
            position:"",
         currentUser:JSON.parse(localStorage.getItem("user")),
    }
   
        

    }

    componentDidMount(){
        console.log("msg")
        axios.get(`http://localhost:8080/voting/candidateByElectionId/${this.props.match.params.id}`, { headers: authHeader() })
        .then((ResponseData)=> {console.log(ResponseData); console.log(this.state.currentUser.id)
        this.setState({candidate:ResponseData.data})})
        .catch((error)=>{console.log("Error in election Data");} )
    }

    CastVote(electionId,cId){
        axios.put(`http://localhost:8080/voting/giveVote`,{
            user:{
                id: this.state.currentUser.id
            },
            election:{
                electionId:electionId
            },
            candidateId:cId
        }, { headers: authHeader() }).then((ResponseData)=>{
            alert(ResponseData.data);
            console.log(this.state.currentUser.id   + "election id " + this.props.match.params.id)
            
        }).catch((error)=>{console.log("Error "+electionId +cId)})
    }

    render()
    {
        var result=this.state.candidate.map(
        (Candidates,index)=>
        {this.position=Candidates.election.positionName
            return (
                <tr  key={Candidates.candidateId}>
                    <td>{Candidates.user.firstName} {Candidates.user.lastName}</td>
                    <td>{Candidates.user.gender} </td>
                    <td>{Candidates.user.age} </td>
                    <td>{Candidates.partyName}</td>
                    <td>{Candidates.symbol}</td>
                    <td><button  type="button" onClick={ () => this.CastVote(Candidates.election.electionId,Candidates.candidateId)} class="btn btn-danger">Cast Vote</button></td>
                </tr>
            )
        }
    )
        return(
            <div className="py-8 container-sm bgCastVote ">
            <h2 align="center" > Candidates for {this.position}</h2>
            <table table class="table table-striped table-hover table-light" border="2">
            <thead>
            <tr>
                <th scope="col md-2" className = "bg-dark text-white" >Candidate Name</th>
                <th scope="col" className = "bg-dark text-white" >Gender</th>
                <th scope="col" className = "bg-dark text-white" >Age</th>
                <th scope="col" className = "bg-dark text-white" >Party Name</th>
                <th scope="col" className = "bg-dark text-white" >Symbol</th>
                <th scope="col" className = "bg-dark text-white" >Action</th>    
            </tr>  
          
            </thead>
            <tbody>
            {  result }
            </tbody>
              
            </table>
        </div>
        )
    }
}
export default ViewCandidate;

// 