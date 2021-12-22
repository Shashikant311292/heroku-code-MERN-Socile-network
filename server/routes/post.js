const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post")
router.post("/createpost",requireLogin,(req,res)=>{
    const {title, body, pic} = req.body;
    if(!title || !body || !pic)
    {
       return res.status(422).json({error:"Please add all the filds"})
    }
    req.user.password = undefined
     const post = new Post({
        title,
        body,
        photo:pic,
        postedby:req.user
    })
    post.save().then(result=>{
        return res.json({post:result});
    }).catch(error=>{
      console.log(error);
    })
})

router.get("/allpost",requireLogin,(req,res)=>{
    Post.find().populate("postedby","_id name").then(posts=>{
        res.json({posts})
    }).catch(error=>{
        console.log(error);
    })
})

router.get("/mypost",requireLogin, (req,res)=>{
 Post.find({postedby:req.user._id}).populate("postedby","_id name").then(mypost=>{
     res.json({mypost});
 }).catch(error=>{
     console.log(error);
 })
})

module.exports = router