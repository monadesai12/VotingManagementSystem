import axios from "axios";
import React from "react";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import authHeader from "../services/auth-header";
class NominateCandidate extends React.Component{
  constructor(props){
    super(props);
    this.state={
      partyName :"",
      symbol:"",
      election:[],
      electionId:"",
      user:[],
        id:"",
        errors:{
          partyName:"",
          symbol:"",
        },
     
        currentUser:JSON.parse(localStorage.getItem("user")),
     
    };

    
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

 

  componentDidMount(){
    console.log("Data Aa raha hai")
    axios.get( `http://localhost:8080/election/listAllElection`, { headers: authHeader() })
    .then((ResponseData)=> {console.log(ResponseData);
      this.setState({users:ResponseData.data})})
      .catch((error)=>{console.log("Error in Election Data")})
  }
  
  handleChange(event)
{   
  const { name, value } = event.target;
  let errors = this.state.errors;

  switch (name) {
    case 'partyName': 
        errors.partyName = 
        value.length <2  
        ? 'Party Name must be 2 characters long!'
        : '';
    break;
    case 'symbol': 
    errors.symbol = 
        value.length <2  
        ? 'Symbol Name is mandatory!'
        : '';
    break;
    
    default:
    break;
 }

    this.setState({errors, [name]: value}, ()=> {
        console.log(errors)
    });

    this.setState({
        ...this.state,
        [event.target.name] : event.target.value, 
    })

    console.log(this.state.partyName);
    console.log(this.state.symbol);
   
}

  handleSubmit = async (event) =>{
    event.preventDefault();
    let candidates ={
      partyName:this.state.partyName,
      symbol:this.state.symbol,
      election:{
      electionId:this.props.match.params.id
      },
      user:{
        id:this.state.currentUser.id
      },
     
    };

  await axios 
  .post(`http://localhost:8080/candidate/nominate`, candidates ,{ headers: authHeader() })
  .then((data) =>{alert("Nominates Successfully!")  ;
  console.log("user" + this.state.currentUser.id  +  "electeytion" + this.props.match.params.id)

    })
  .catch((error) => { alert(error) ;
     console.log(candidates);
     console.log("user" + this.state.currentUser.id  +  "electeytion" + this.props.match.params.id)

  });
};



    render(){
    return(
    <div className= "container-sm mt-4 pd-4">

           
      <div className="card">
        <div className="card-body">
        <form>
        <div className="form-group">
          <label for="party">Party Name</label>
          <input type="text" name="partyName" className="form-control" id="party" value={this.state.partyName} onChange={this.handleChange} ></input>
        </div>

        <div className="form-group">
          <label for="sym">Symbol</label>
          <input type="text" name="symbol" className="form-control" id="sym" value={this.state.symbol} onChange={this.handleChange} ></input>
        </div>
        <button type="submit"  className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </form>
        </div>
      </div>
      
      </div>
    );
  }
}
export default NominateCandidate;


