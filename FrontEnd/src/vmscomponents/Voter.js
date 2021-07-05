import React, { Component }  from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import authHeader from "../services/auth-header";
import DeleteIcon from '@material-ui/icons/Delete';
import SearchBox from "./SearchBox";



class Voter extends Component{
    constructor(props)
    {
        super(props);
        this.state={users:[],
            errmsg:"",
            searchField: '',  
        };
        this.deleteUser=this.deleteUser.bind(this);
       
        
    }
//==========================GET ALL Voters==============================================================================================================
  componentDidMount()
  {
        console.log(" Add voter componentDidMount excecuted");
        axios.get(`http://localhost:8080/listAllVoters`, { headers: authHeader() })
        .then((responseUserData)=>{console.log(responseUserData);
        this.setState({users:responseUserData.data,}) })
        .catch((error)=>{console.log("Some error in user(voter) read data ");
      })
  }
 //============================================================================================
 
 deleteUser=(id)=>{

    const User_API_BASE_URL = 'http://localhost:8080/deletevoter'
     axios.put(User_API_BASE_URL + '/' + id, {},{ headers: authHeader() })
     .then( res => {
      this.setState({users: this.state.users.filter(users => users.id !== id)});
    });
    //this.props.history.replace("allusers")
   
}
//============================================================================================

//============================================================================================  
    render()
    {   
        const { users, searchField } = this.state;
        var filteredData = users.filter(filterUser => {
    
            if (filterUser.firstName.toLowerCase().includes(searchField.toLowerCase())) {
                return filterUser;

            }
            else if (filterUser.lastName.toLowerCase().includes(searchField.toLowerCase())) {
                return filterUser;

            }
            else if (filterUser.adharCardNumber.toLowerCase().includes(searchField.toLowerCase())) {
                return filterUser;

            }

        })
         
        // var AllVotersList=this.state.users.map(
            .map(
            (Voters,index)=>
            {
            return (    
                <tr key={Voters.id}>
                      <td>{Voters.id}</td>
                      <td>{Voters.firstName}</td>
                      <td>{Voters.lastName}</td>
                      <td>{Voters.age}</td>
                      <td>{Voters.address}</td>
                      <td>{Voters.mobileNumber}</td>
                      <td>{Voters.adharCardNumber}</td>
                      <td><button  type="button" class="btn btn-danger mr-4"
                      onClick={ () => this.deleteUser(Voters.id)} > <DeleteIcon/> </button>
                     </td>              
                </tr>)
            }
        );
        return (
            <div className="py-8">
            <h2 align="center" > Voters List </h2>
            <table class="table table-striped table-light table-bordered" border="3">
            <tr>
                <th scope="col" className = "bg-dark text-white" >Voter Id</th>
                <th scope="col" className = "bg-dark text-white" >First Name</th>
                <th scope="col" className = "bg-dark text-white" >Last Name</th>
                <th scope="col" className = "bg-dark text-white" >Age</th>
                <th scope="col" className = "bg-dark text-white">Address</th> 
                <th scope="col" className = "bg-dark text-white">Mobile Number</th>  
                <th scope="col" className = "bg-dark text-white">AdharCard Number</th>  
                <th scope="col" className = "bg-dark text-white">Action</th>    
            </tr>  
            <tbody>
            <tr>
            <td></td>
                <td>
                    <SearchBox placeholder="FirstName" id="form1" class="form-control" handleChange={(e) => this.setState({ searchField: e.target.value })} />
                </td>
                
                <td>
                    <SearchBox placeholder="Last Name" handleChange={(e) => this.setState({ searchField: e.target.value })} />
                </td>
                <td></td><td></td> <td></td>
                <td>
                    <SearchBox placeholder="Aadharcard No" handleChange={(e) => this.setState({ searchField: e.target.value })} />
                </td>
                <td></td><td></td>

            </tr>
            {filteredData}
            </tbody>
                   
            </table>
        </div>
        );
    }
}

export default Voter;



/*

*/ 