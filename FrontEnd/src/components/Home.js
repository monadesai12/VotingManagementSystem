import React, { useState, useEffect } from "react";
import '../index.css';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import UserService from "../services/user.service";

// const Home = () => {
//   const [content, setContent] = useState("");


//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>Home</h3>
//       </header>
//     </div>
//   );
// };
const Home = () => {
  const [content, setContent] = useState("");
  return (
      <div className="bg">

      <div className="pt-4 text-center">
       <h1 > 
         " THE <span className="text-danger">  BALLOT  </span>IS STRONGER <br/>
         THAN THE <span className="text-danger">  BULLET </span>"
         <br/>
       </h1> 
       <HowToVoteIcon fontSize="large" />
       </div>
      </div>

  );
}

export default Home;