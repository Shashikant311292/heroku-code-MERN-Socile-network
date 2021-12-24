const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGOURI} = require("./config/valueKeys");
const PORT = process.env.PORT || 5000

mongoose.connect(MONGOURI);
// 0PyvwMARi4Xn7BTU and id SocialNetwork for database access
mongoose.connection.on("connected",()=>{
    console.log("mongoose connect");
})

mongoose.connection.on("error", ()=>{
    console.log("error mongoose");
})

require("./models/user");
require("./models/post");
app.use(express.json())
app.use(require("./routes/authen.js"));
app.use(require("./routes/post.js"));
app.use(require("./routes/user.js"));

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log(PORT);
});