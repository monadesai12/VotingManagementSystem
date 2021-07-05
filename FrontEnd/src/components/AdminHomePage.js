import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import BoardAdmin from "./BoardAdmin";
import MiniDrawer from "./MiniDrawer";
const AdminHomePage = () => {
    const [content, setContent] = useState("");
  
    useEffect(() => {
      UserService.getAdminBoard().then(
        (response) => {
            console.log(response.data)
            setContent(BoardAdmin);
        },
        (error) => {
          setContent("Access allowed only to admin");
          console.log((error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString())
        }
      );
    }, []);
  
    return (
      <div>
   <MiniDrawer/>
      </div>
     
       
      
    );
  };
   export default AdminHomePage;