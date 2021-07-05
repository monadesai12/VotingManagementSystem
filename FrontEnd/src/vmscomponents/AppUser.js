import {BrowserRouter as Router, Route,Switch} from "react-router-dom"
import ViewElections from './ViewElections';
import NominateCandidate from './NominateCandidate';
import Voter from './Voter';
import ViewCandidate from './ViewCandidate';
import ViewResult from './ViewResult';
import Result from './Result';
import ResultId from './ResultId';
import NavBarComponent from './NavBarComponent';
import UpdateUser from './UpdateUser';
import ViewAllCandidates from "./ViewAllCandidates";

function AppUser() {
  return (
    <Router>
    <div classNameName="App">
      <NavBarComponent/>
      <Switch>
        <Route path="/ViewElections" component ={ViewElections}/>
        <Route path="/ViewCandidate/:id" component ={ViewCandidate}/>
        <Route path="/ViewResult" component ={ViewResult}/>
        <Route path="/Result" component ={Result}/>
        <Route path="/ResultId/:id" component ={ResultId}/>
        <Route path="/ViewElection" component={ViewElections}></Route>
        <Route path="/Voter" component={Voter}></Route>
        <Route path="/NominateCandidate/:id" component={NominateCandidate}></Route>
        <Route path="/UpdateUser/:id" component={UpdateUser}></Route>
        <Route path="/ViewAllCandidates" component={ViewAllCandidates}></Route>
        
      </Switch>
      </div>
    </Router> 
  );
}

export default AppUser;




