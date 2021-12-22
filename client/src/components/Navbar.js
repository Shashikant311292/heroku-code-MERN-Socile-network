import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Navbar = ()=>{
   const {state, dispatch} = useContext(userContext)
   const navigator = useNavigate();
   const renderList = () =>{
     if(state){
       return(
         <>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/createpost">Create post</Link></li>
        <li>
        <button className="btn waves-effect waves-light #e57373 blue lighten-2" type="submit" name="action"
         onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          navigator("/signin")
        }} >Logout
        </button>
        </li>
        </>
       )
     }
     else{
       return (
         <>
        <li><Link to="/signin">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        </>
       )
     }
   }
    return(
        <nav>
        <div className="nav-wrapper">
          <Link to={state?"/":"/signin"} className="brand-logo left b">The Social Network</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
         
          </ul>
        </div>
      </nav>
            
    )
}

export default Navbar