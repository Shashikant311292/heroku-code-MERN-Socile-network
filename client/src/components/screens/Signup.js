import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css';
const Signup = () => {
    const navigator = useNavigate();
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const PostData = ()=>{
         if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
             M.toast({html:"Invalid email id", classes:"#c62828 red darken-3"});
             return;
         }
         fetch("/signup",{
             method:"post",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify(
                 {
                    email:email,
                    password:password,
                    name:name
                 }
             )
         }).then(res=>res.json()).then(data=>{
             if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"});
             }else
             {
                M.toast({html: data.message, classes:"#ba68c8 purple lighten-2"});
                navigator("/signin");
             }
         }).catch(error=>{
             console.log(error);
         })
     }
    return (
        <div>
        <div className="mycard">
            <div className="card auth-card">
            <h3>The Social Network</h3>
            <input type="text" placeholder="Enter Your  name"  value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="text" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <button onClick={()=>{PostData()}} className="btn waves-effect waves-light #e57373 red lighten-2" type="submit" name="action">Signup
            <i className="material-icons right">send</i>
            </button >
            <h6><Link to="/signin">Already have an account?</Link></h6>
            </div>
        </div>
        </div>
    )
}

export default Signup
