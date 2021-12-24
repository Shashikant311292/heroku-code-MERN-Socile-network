const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/valueKeys");
const requireLogin = require("../middleware/requireLogin");
router.get("/",(req,res)=>{
    res.send("Hello main page")
});

router.post("/signup",(req,res)=>{
    const {name, email, password, pic} = req.body
    if(!name || !email || !password)
    {
        res.status(422).json({error:"please enter value"})
    }
    User.findOne({email:email}).then((savedUser =>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with this user id"})
        }
        bcrypt.hash(password,12).then(hashedpassword => {
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic
              })
              user.save().then(user=>{
                  res.json({message: "Your data send succesfully"});
              }).catch(err=>{
                  console.log(err);
              })
        })
        

    })).catch(err=>{
        console.log(err);
    })
    // res.json({message: "Your data send succesfully"});
//   console.log(req.body.name);
});

router.get("/protected",requireLogin,(req,res)=>{
    res.send("hello user")
})

router.post("/signin",(req,res)=>{
  const {email, password} = req.body;
   if(!email || !password)
   {
       return res.status(422).json({error:"please enter email and password"});
   }
   User.findOne({email:email}).then(savedUser=>{
       if(!savedUser){
           return res.status(422).json({error:"invalid email and password"});
       }
       bcrypt.compare(password, savedUser.password).then(doMatch=>{
           if(doMatch)
           {
               //res.json({message:"successfully singin"});
               const token = jwt.sign({_id:savedUser._id}, JWT_SECRET);
               const {_id, name, email,followers,following,pic} = savedUser
               res.json({token,user:{_id, name, email, followers, following, pic}})
           }
           else
           {
                return res.status(422).json({error:"invalid email and password"});
           }
       }).catch(error=>{
            console.log(error);
       })
   })
   
});

module.exports = router