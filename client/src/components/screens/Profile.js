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
            console.log(result)
            setPics(result.mypost)
       }).catch(error=>{
           console.log(error);
       })
    },[])
    return (
        <div style={{maxWidth:"750px", margin:"0px auto"}}>
           <div style={{display:'flex',justifyContent:"space-around", margin:"18px 0px",borderBottom:"1px solid gray"}}>
               <div>
                   <img style={{width:"160px", height:"160px", borderRadius:"80px" }} 
                   src={state?state.pic:"loadding"}/>
               </div>
               <div>
                   <h4>{state?state.name:"Loadding"}</h4>
                   <div style={{display:'flex',justifyContent:'space-around',width:'108%'}}>
                   <h6>{mypics.length} posts</h6>
                   <h6>{state?state.followers.length:"0"} followers</h6>
                   <h6>{state?state.following.length:"0"}  following</h6>
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
