import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'

export const Profile = () => {
    const {state,dispatch} = useContext(userContext);
    const [mypics, setPics] = useState([]);
    useEffect(() => {
       fetch("/mypost",{
           headers:{
               "Authorization": "Bearer "+ localStorage.getItem("jwt")
           }
       }).then(res=>
        res.json()).then(result=>{
            setPics(result.mypost)
       }).catch(error=>{
           console.log(error);
       })
    },[])
    return (
        <div style={{maxWidth:"750px", margin:"0px auto"}}>
           <div style={{display:'flex',justifyContent:"space-around", margin:"18px 0px",borderBottom:"1px solid gray"}}>
               <div>
                   <img style={{width:"160px", height:"160px", borderRadius:"80px" }} src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
               </div>
               <div>
                   <h4>{state?state.name:"Loadding"}</h4>
                   <div style={{display:'flex',justifyContent:'space-around',width:'108%'}}>
                   <h6>35 posts</h6>
                   <h6>35 followers</h6>
                   <h6>35 following</h6>
                   </div>
               </div>
           </div>
         <div className="gallery">
             {mypics.map(item =>{
                 return( <img className="item" src={item.photo}  key={item._id}/>
                 )
               
             })}
           
         </div>
        </div>
    )
}
