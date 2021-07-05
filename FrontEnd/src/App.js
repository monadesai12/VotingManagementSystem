import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import AdminHomePage from './components/AdminHomePage'
import ManagerHomePage from './components/ManagerHomePage'
import VoterHomePage from './components/VoterHomePage'
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Register from "./components/Register";
import AppUser from "./vmscomponents/AppUser";
import MiniDrawer from "./components/MiniDrawer";
import ButtonAppBar from "./components/ButtonAppBar";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import NominateCandidate from "./vmscomponents/NominateCandidate";
import Dashboard from "./vmscomponents/DashBoard";
import ViewElection from "./vmscomponents/ViewElection";
import CreateElection from "./vmscomponents/CreateElection";
import ViewAllCandidates from "./vmscomponents/ViewAllCandidates";
import Voter from "./vmscomponents/Voter";
import Result from "./vmscomponents/Result";
import ResultId from "./vmscomponents/ResultId";
import UpdateElection from "./vmscomponents/UpdateElection";
import Register2 from "./components/Register2";


const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);


  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
          {currentUser ? (
               <div>
                 </div>
          ) : (
            <ButtonAppBar/>
            // <nav className="navbar navbar-expand navbar-dark">
            // <div className="navbar-nav ">
            //   <li className="nav-item">
            //     <Link to={"/login"} className="nav-link">
            //       Login
            //     </Link>
            //   </li>

            //   <li className="nav-item">
            //     <Link to={"/signIn"} className="nav-link">
            //       Register
            //     </Link>
            //   </li>
             
            // </div>
            // </nav>
          )}
       

        <div className="p">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signIn" component={Register} />
             <Route path="/admin" component={MiniDrawer} />
            <Route exact path="/user" component={PrimarySearchAppBar} />
           
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;