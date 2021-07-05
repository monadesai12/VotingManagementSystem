import axios from "axios";

import React from "react";
import authHeader from "../services/auth-header";

class CreateElection extends React.Component{
    constructor(props){
        super(props)
        this.state={
            election:[],
           
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this); 
    
  }
  handleChange(event){
    
    this.setState({[event.target.name] : event.target.value})
    
 
    
  }

handleSubmit(event){
event.preventDefault()


axios.post('http://localhost:8080/election/createElection', {
    electionId : this.state.electionId,
    positionName : this.state.positionName,
    description : this.state.description,
    electionDate : this.state.electionDate,
    startNominationDate : this.state.startNominationDate,
    endNominationDate : this.state.endNominationDate
    }, { headers: authHeader() })
    .then(function(responce){
    console.log(responce);
    alert("Election created");
    })
    .then(
    ()=>{
        this.setState({
        positionName:"",
        description:"",
        electionDate:"",
        startNominationDate:"",
        endNominationDate:""
        })
    }
    )
    .catch(function(error){
    alert("Error!!");
    }
    )
}
render(){
 
return  <div className= "container-sm mt-4 pd-4">  
    <div className="card">
        <h5 className="card-header">Create election</h5>
        <div className="card-body">

            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label for="positionName">Position Name</label>
                    <input type="text" className="form-control" name="positionName"  onChange={this.handleChange} value={this.state.positionName} id="positionName" placeholder="Enter Position Name"/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" name="description"  onChange={this.handleChange} value={this.state.description} id="description" placeholder="description"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputDate1">Election Date</label>
                    <input type="datetime-local" className="form-control" name="electionDate"  onChange={this.handleChange} value={this.state.electionDate} id="dateE"/>

                </div>
                <div className="form-group">
                    <label for="exampleInputDate1">Starting date for Nomination</label>
                    <input type="datetime-local" className="form-control" name="startNominationDate"  onChange={this.handleChange} value={this.state.startNominationDate} id="dateS"/>

                </div>
                <div className="form-group">
                    <label for="exampleInputDate1">Ending date for Nomination</label>
                    <input type="datetime-local" className="form-control" name="endNominationDate"  onChange={this.handleChange} value={this.state.endNominationDate} id="dateEnd"/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div><div>

                <button type="submit"  className="btn btn-primary">Submit</button></div>
                </form>
            </div>
        </div>
    </div>

}
}
export default CreateElection;