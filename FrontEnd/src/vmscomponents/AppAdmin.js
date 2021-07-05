import {BrowserRouter as Router,NavLink,Route,Switch} from "react-router-dom"
import CreateElection from "./CreateElection";
import NavBarComponent from "./NavBarComponent";
import UpdateElection from "./UpdateElection";
import ViewElection from "./ViewElection";


function AppAdmin() {
  return (<Router>
    <div className="App1">
    
    </div>
    <div className="App">
      <NavBarComponent/>
     <Switch>
       <Route path="/ViewElection" component={ViewElection}/>
       <Route path="/createelection" component={CreateElection}/>
       <Route path="/UpdateElection/:id" component={UpdateElection}/>
      </Switch>
    </div></Router>
  
  );
}

export default AppAdmin;