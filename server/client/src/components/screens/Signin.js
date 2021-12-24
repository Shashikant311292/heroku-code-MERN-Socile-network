import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css';
import { userContext } from '../../App';
const Signin = () => {
    const {state, dispatch} = useContext(userContext)
    const navigator = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email id", classes:"#c62828 red darken-3"});
            return;
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                   email:email,
                   password:password
                }
            )
        }).then(res=>res.json()).then(data=>{
            if(data.error){
               M.toast({html: data.error, classes:"#c62828 red darken-3"});
            }else
            {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({type:"USER", payload:data.user})
               M.toast({html: "Singin successfully", classes:"#ba68c8 purple lighten-2"});
               navigator("/");
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    return (
        <form className="mycard">
        <div className="card auth-card">
            <h3>The Social Network</h3>
            <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="on"/>
            <button onClick={()=>PostData()} className="btn waves-effect waves-light #e57373 red lighten-2" type="button" name="action">Login
            <i className="material-icons right">send</i>
            </button>
            <h6><Link to="/signup">Don't have an account?</Link></h6>
        </div>
        </form>
    )
}

export default Signin
