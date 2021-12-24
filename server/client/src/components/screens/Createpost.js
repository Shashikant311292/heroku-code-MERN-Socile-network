import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import { useNavigate } from 'react-router';
const Createpost = () => {
    const [title, settitle] = useState("");
    const [body, setbody] = useState("");
    const [image, setimage] = useState("");
    const [url, seturl] = useState("");
    const navigator = useNavigate();
 
    useEffect(() => {
        if(url)
        {
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify(
                {
                   title,
                   body,
                   pic:url
                   
                }
            )
        }).then(res=>res.json()).then(data=>{
            if(data.error){
               M.toast({html: data.error, classes:"#c62828 red darken-3"});
            }else
            {
               M.toast({html: "Created post successfully", classes:"#ba68c8 purple lighten-2"});
               navigator("/");
            }
        }).catch(error=>{
            console.log(error);
        })
        }
    }, [url])

    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","socialnetwork")
        data.append("cloud_name","shashikant311292")
        fetch("https://api.cloudinary.com/v1_1/shashikant311292/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            seturl(data.url);
        }).catch(error=>{
            console.log(error);
        })

        }  
    return (
        <div className="card input-field" style={{margin:"10px auto", maxWidth:"650px", padding:"20px", textAlign:"center"}}>
            <input type="text" placeholder="Title" value={title} onChange={(e)=>{settitle(e.target.value)}}/>
            <input type="text" placeholder="Description" value={body} onChange={(e)=>{setbody(e.target.value)} }/>
            <div className="file-field input-field">
            <div className="btn waves-effect waves-light #e57373 red lighten-2">
                <span>Upload photo</span>
                <input type="file" onChange={(e)=> {setimage(e.target.files[0])}} />
            </div>
            <div className="file-path-wrapper">
             <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #e57373 red lighten-2" type="submit" name="action"
             onClick={()=>postDetails()}>
                Upload Post
            </button>
        </div>
    )
}

export default Createpost
