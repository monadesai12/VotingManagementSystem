import axios from "axios";
import React from "react";
import authHeader from "../services/auth-header";
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
            endNominationDate : ''
        }
        this.changeElectionDate = this.changeElectionDate.bind(this);
        this.changeStartNominationDate = this.changeStartNominationDate.bind(this);
        this.changeEndNominationDate = this.changeEndNominationDate.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    

  }
  changeElectionDate(event) {
    this.setState({
        electionDate: event.target.value
    })

    console.log(this.state.electionDate)
}
changeStartNominationDate(event) {
    this.setState({
        startNominationDate: event.target.value
    })
}
changeEndNominationDate(event) {
    this.setState({
        endNominationDate: event.target.value
    })
}

  componentDidMount(){
    console.log("msg")
    
    axios.get(`http://localhost:8080/election/viewElectionById/${this.props.match.params.id}`, { headers: authHeader() })
    .then((ResponseData)=> {console.log(ResponseData);
    console.log("update"+this.props.match.params.electionId)
    this.setState({election:ResponseData.data})})
    .catch((error)=>{console.log("Error in election Data"+ this.props.match.params.electionId)})
}
handleChange(event){
     
    this.setState({value: event.target.value}); 
}

update(event) {
        
        const url = `http://localhost:8080/election/updateElection/${this.props.match.params.id}`;
        event.preventDefault();
        axios.put(url, {
            positionName: this.state.election.positionName,
            description: this.state.election.description,
            electionDate: this.state.electionDate,
            startNominationDate: this.state.startNominationDate,
            endNominationDate: this.state.endNominationDate,
        },  { headers: authHeader() }).then((responseEmpData) => {
            console.log(responseEmpData);
            alert("Updated Successfully");
        }).catch((error) => {
            console.log(error);
            console.log("Some error in updating product data");
        })

    }



render(){
  return <div className= "container-sm mt-4 pd-4">  
  <div className="card">
    <h5 className="card-header">Update election</h5>
        <div className="card-body">

        <form onSubmit={this.update}>
            <div className="form-group">
                <label for="positionName">Position Name</label>
                <input type="text" className="form-control" name="positionName" disabled value={this.state.election.positionName} id="positionName" placeholder="Enter Position Name"/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" name="description" disabled value={this.state.election.description} id="description" placeholder="description"/>
            </div>
            <div className="form-group">
                <label for="exampleInputDate1">Election Date</label>
                <input type="datetime-local" className="form-control" name="electionDate"  onChange={this.changeElectionDate} id="dateE"/>
            </div>
            <div className="form-group">
                <label for="exampleInputDate1">Starting date for Nomination</label>
                 <input type="datetime-local" className="form-control" name="startNominationDate"  onChange={this.changeStartNominationDate}  id="dateS"/>
            </div>
            <div className="form-group">
                <label for="exampleInputDate1">Ending date for Nomination</label>
                <input type="datetime-local" className="form-control" name="endNominationDate"  onChange={this.changeEndNominationDate}  id="dateEnd"/>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div><div>

            <button type="submit" onClick={this.update} className="btn btn-primary">Update</button></div>
        </form>
        </div>
        </div>
  </div>
}
}
export default UpdateElection;