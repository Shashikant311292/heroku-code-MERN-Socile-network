// module.exports ={
//     MONGOURI:"mongodb+srv://SocialNetwork:0PyvwMARi4Xn7BTU@cluster0.4vhtp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     JWT_SECRET:"jwtsocialnetwork"
// }

if(process.env.NODE_ENV == 'production'){
    module.exports = require('./prod')
}
else{
    module.exports = require('./dev')
}