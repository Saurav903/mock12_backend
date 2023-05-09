const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"userdata",(err,decoded)=>{
            if(decoded){
                console.log(decoded._id);
                req.body._id=decoded._id;
            }else{
                res.send("token not verify")
            }
        })
    }else{
        res.send("login please");
    }
}

module.exports={
    authenticate
}