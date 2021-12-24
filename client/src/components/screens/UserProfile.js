import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { userContext } from '../../App'

export const UserProfile = () => {
    const [Prof, setProf] = useState("")
    const {state,dispatch} = useContext(userContext)
    const [userPost, setuserPost] = useState("")
    const [userName, setuserName] = useState("")
    const [userEmail, setuserEmai] = useState("")
    const {userid} = useParams()
    const [showFollow, setshowFollow] = useState(state?!state.following.includes(userid):true)
   
    const [userpic, setuserpic] = useState("")
    useEffect(() => {
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization": "Bearer "+ localStorage.getItem("jwt")
           }
       }).then(res=>
        res.json()).then(result=>{    
            console.log(result)     
            setuserName(result.user.name)
            setuserEmai(result.user.email)
            setuserPost(result.posts)
            setProf(result);
            setuserpic(result.user.pic)
       }).catch(error=>{
           console.log(error);
       })
    },[])

    const followUser = () =>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res=>res.json()).then(data=>{
            dispatch({type:"UPDATE", payload:{following:data.following,followers:data.followers}});
            localStorage.setItem("user",JSON.stringify(data))
            setProf((prevState)=>{
               return{
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
               } 
            })
            setshowFollow(false)
        })
    }
    const unfollowUser = () =>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res=>res.json()).then(data=>{
            dispatch({type:"UPDATE", payload:{following:data.following,followers:data.followers}});
            localStorage.setItem("user",JSON.stringify(data))
            setProf((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=> item != data._id)
               return{
                    user:{
                        ...prevState,
                        users:{
                         ...prevState.user,
                         followers:newFollower
                        }
                    }
               } 
            })
            setshowFollow(true)
            window.location.reload();
        })
    }
    return (
       
            <div style={{maxWidth:"750px", margin:"0px auto"}}>
            <div style={{display:'flex',justifyContent:"space-around", margin:"18px 0px",borderBottom:"1px solid gray"}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px" }} 
                    src={userpic}/>
                </div>
                <div>
                    <h4>{userName}</h4>
                    <h5>{userEmail}</h5>
                    <div style={{display:'flex',justifyContent:'space-around',width:'108%'}}>
                    <h6>{userPost.length} posts</h6>
                    <h6>{Prof.user === undefined ?"loadding":Prof.user.followers === undefined?"loadding":Prof.user.followers.length} followers</h6> 
                    <h6>{Prof.user === undefined ?"loadding":Prof.user.following === undefined?"loadding":Prof.user.following.length} following</h6> 
                    </div>
                    {!JSON.parse(localStorage.getItem("user")).following.includes(userid) && showFollow?<button onClick={()=>followUser()} className="btn waves-effect waves-light #e57373 blue lighten-2" type="button" name="action">folloW
                    <i className="material-icons right"></i>
                    </button>:<button onClick={()=>unfollowUser()} className="btn waves-effect waves-light #e57373 red lighten-2" type="button" name="action">unfolloW
                    <i className="material-icons right"></i>
                    </button>}
                     <br />
                </div>
            </div>
            <>
            { userPost? <div className="gallery">
                {
                userPost.map(item =>{
                    return( <img className="item" src={item.photo}  key={item._id}/>
                    )
                
                })
                }

            </div> : ""
            }
            </>
         </div>
       
    )
}
