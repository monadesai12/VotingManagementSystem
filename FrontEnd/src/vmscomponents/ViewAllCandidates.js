import axios from "axios";
import React from "react";
import SearchBox from './SearchBox';
import { BrowserRouter as Router, Route, Link, NavLink }from "react-router-dom";
import authHeader from "../services/auth-header";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DeleteIcon from '@material-ui/icons/Delete';



class ViewAllCandidates extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            AllCandidates: [],
            searchField: '', 
        }
        this.CancelCandidate = this.CancelCandidate.bind(this);
        this.ConfirmCandidate = this.ConfirmCandidate.bind(this);
        
    }
    CancelCandidate = (candidateId)=>{

        if (window.confirm("Are you sure to delete?")) {
        const URL = 'http://localhost:8080/candidate/cancelcandidate'
         axios.put(URL + '/' + candidateId, {},{ headers: authHeader() }).then( res => {
            this.setState({AllCandidates: this.state.AllCandidates.filter(AllCandidates=> AllCandidates.candidateId !== candidateId)});
   
        });

    }
       
    }

    ConfirmCandidate = (candidateId)=>{

        const URL = 'http://localhost:8080/candidate/confirmcandidate'
         axios.put(URL + '/' + candidateId, {},{ headers: authHeader() }).then( res => {
            //this.setState({AllCandidates: this.state.AllCandidates.filter(AllCandidates => AllCandidates.candidateId == candidateId)});
        });
         this.props.history.replace("/DashBoard")
       
    }

    componentDidMount() {
        axios.get('http://localhost:8080/candidate/viewAllCandidate', { headers: authHeader() })
        .then((responseAll) => {
            console.log(responseAll);
            this.setState({ AllCandidates:responseAll.data})
        })
        .catch((error) => {
            this.setState({errMsg:".........."})
        })
       
    }
    render() {

        const { AllCandidates, searchField } = this.state;
        var filteredData = AllCandidates.filter(filterUser => {
    
            if (filterUser.user.firstName.toLowerCase().includes(searchField.toLowerCase())) {
                return filterUser;

            }
            else if (filterUser.partyName.toLowerCase().includes(searchField.toLowerCase())) {
                return filterUser;

            }
            else if (filterUser.candidateConfirmation.toLowerCase().includes(searchField.toLowerCase())) {
                return filterUser;

            }

        })

        // var candidateList=this.state.AllCandidates
        
        .map(
            (cand,index) =>{
                return (
                    <tr key={cand.candidateId}>
                        <td>{cand.candidateId} </td>
                        <td> {cand.user.firstName} {cand.user.lastName}</td>
                        <td>{cand.partyName} </td>
                        <td>{cand.symbol} </td>
                        <td>{cand.candidateConfirmation} </td>
                        <td>{cand.votes} </td>
                        <td><button  type="button" onClick={ () => 
                                this.CancelCandidate(cand.candidateId)} class="btn btn-danger"> <DeleteIcon/> </button></td>
                        <td><button  type="button" onClick={ () => 
                                this.ConfirmCandidate(cand.candidateId)} class="btn btn-primary"><VerifiedUserIcon/> </button></td>
                         <td> 
                    </td>
                    </tr>
                    
                )
            }
        );
        return(
            <div className= "container-sm mt-4 pd-4">
                 <h2 align="center" > Candidates </h2>
                <table table class="table table-striped table-hover table-light" border="2">
                <thead> <tr>
                        <th scope="col md-2" className="bg-dark text-white">CANDIDATE ID</th>
                        <th scope="col md-8" className="bg-dark text-white">CANDIDATE NAME</th>
                        <th scope="col md-4" className="bg-dark text-white">PARTY NAME</th>
                        <th scope="col md-3" className="bg-dark text-white">SYMBOL</th>
                        <th scope="col md-5" className="bg-dark text-white">STATUS</th>
                        <th scope="col md-5" className="bg-dark text-white">VOTES</th>
                        <th scope="col md-6" className="bg-dark text-white">CANCEL</th>
                        <th scope="col md-7" className="bg-dark text-white">CONFIRM</th>               
                        
                    </tr>
                    
                    </thead> 
                    <tbody>
                    
                        <tr>
                            <td></td>
                            <td>
                                <SearchBox placeholder="Candidate Name" id="form1" class="form-control" handleChange={(e) => this.setState({ searchField: e.target.value })} />
                            </td>
                            
                            <td>
                                <SearchBox placeholder="Party Name" handleChange={(e) => this.setState({ searchField: e.target.value })} />
                            </td>
                            <td></td>
                            <td>
                                <SearchBox placeholder="Status" handleChange={(e) => this.setState({ searchField: e.target.value })} />
                            </td>
                            <td></td><td></td>
                            <td></td><td></td>

                        </tr>
                {filteredData}
                </tbody>
                   
                </table>
                
            </div>
        )
    }
}
export default ViewAllCandidates