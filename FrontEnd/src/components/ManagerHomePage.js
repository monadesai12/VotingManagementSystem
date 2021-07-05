import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import BoardManager from "./BoardManager";
const ManagerHomePage = () => {
    const [content, setContent] = useState("");
  
    useEffect(() => {
      UserService.getManagerBoard().then(
        (response) => {
            console.log(response.data)
            setContent(BoardManager);
        },
        (error) => {
          setContent("Access allowed only to manager");
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
   export default ManagerHomePage;