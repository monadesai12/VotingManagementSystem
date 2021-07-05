import React from 'react';
import authHeader from "../services/auth-header";
const SearchBox = (props) =>{
    return(
<div class="form-outline">


  <input type='search'
         className = 'search'
         id="form1" class="form-control"
         placeholder ={props.placeholder}
         onChange ={props.handleChange}
        
         
        />
</div>
        
    )

}

export default SearchBox;