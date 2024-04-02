const { sign } = require("jsonwebtoken");
const sha256 = require("sha256");
const authController = {
    REGISTER: function(req, res){
        const users = req.getData("users");
        try{
            const user = {
                ...req.body,
                password: sha256(req.body.password),
                userId: users.length ? users[users.length-1].userId + 1: 1
            };
            
            users.push(user);
            req.writeData("users", users);
            res.json({message: "The user successfull registred", accessToken: sign( {payload: user.userId}, "SECRET_KEY", {expiresIn: "1d"} )}).status(201)

        }catch(error){
            console.log(error)
        }
    },
    LOGIN: function(req, res){
        const users = req.getData("users")
        const {email} = req.body;

        const idx = users.findIndex(user => user.email == email);
        if(idx >= 0){
            return res.json({message: "The user successfull logined", user: users[idx], accessToken: sign({payload: users[idx].userId}, "SECRET_KEY", {expiresIn: "1d"})})
        }else{
           return res.json({message: "Invalid"})
        }
        
    }
}
module.exports = {authController}