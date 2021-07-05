import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import BoardVoter from "./BoardVoter";
const VoterHomePage = () => {
    const [content, setContent] = useState("");
  
    useEffect(() => {
      UserService.getVoterBoard().then(
        (response) => {
            console.log(response.data)
            setContent(BoardVoter);
        },
        (error) => {
          setContent("Access allowed only to voter");
          console.log((error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString())
        }
      );
    }, []);
  
    return (
      <div className="container">
        <header className="jumbotron">
          {content}
          </header>
      </div>
    );
  };
   export default VoterHomePage;