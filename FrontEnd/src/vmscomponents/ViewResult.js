import axios from "axios";
import React from "react";
import authHeader from "../services/auth-header";

class ViewResult extends React.Component
{
    constructor(props){
        super(props);
        this.state={candidate:[],resultName:""};
    }
    componentDidMount(){
        console.log("msg")
        axios.get(`http://localhost:8080/voting/allResults`, { headers: authHeader() })
        .then((ResponseData)=> {console.log(ResponseData);
        this.setState({candidate:ResponseData.data})})
        .catch((error)=>{console.log("Error in result Data")})
    }

    render(){
        var result=this.state.candidate.map(
        (Candidates,index)=>
        {this.resultName=Candidates.election.positionName
            return (
                <tr key={Candidates.candidateId}>
                    <td>{Candidates.user.firstName}</td>
                    <td>{Candidates.election.positionName}</td>
                    <td>{Candidates.partyName}</td>
                    <td>{Candidates.symbol}</td>
                    <td>{Candidates.votes}</td>
                </tr>
            )
        }
    )
        return(
            <div className="py-8">
            <h2 align="center"  > Results of Election{this.resultName}</h2>
            <table class="table table-striped table-white table-bordered" border="3">
            <thead>
            <tr>
                <th scope="col" className = "bg-dark text-white" >Canidadate Name</th>
                <th scope="col" className = "bg-dark text-white" >Position</th>
                <th scope="col" className = "bg-dark text-white" >Party Name</th>
                <th scope="col" className = "bg-dark text-white" >Symbol</th>
                <th scope="col" className = "bg-dark text-white" >Number of Votes</th>    
            </tr>  {
                    result
                    }
            </thead>
            </table>
        </div>
        )
    }
}
export default ViewResult;

//  