import React from "react";
import { NavLink } from "react-router-dom";
class NavBarComponent extends React.Component{
render(){
  return <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">VMS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <NavLink class="nav-link" exact to="/createelection">Create election </NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" exact to ="/ViewElection">View Election</NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" exact to="/ViewElections"> All Election  </NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" exact to="/ViewResult"> View Result </NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" exact to="/Result"> Result </NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" exact to="/Voter">Voter</NavLink> 
      </li> 
      <li class="nav-item">
        <NavLink class="nav-link" exact to="/ViewAllCandidates">ViewAllCandidates</NavLink> 
      </li>
        
    </ul>
  </div>
</nav>
}
}
export default NavBarComponent;