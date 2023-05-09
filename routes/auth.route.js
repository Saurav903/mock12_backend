const express = require("express");
const {AuthModel} = require("../model/signin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    try {
        bcrypt.hash(password,4,async(err,hash)=>{
            if (err) {
                res.send(err.message);
            } else {
                const user = new AuthModel({email,password:hash});
                await user.save();
                res.send("User has been registered");
            }
        })
    } catch (error) {
        console.log(error);
        res.send({"message":"Something went wrong","error":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await AuthModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if (result) {
                    const token = jwt.sign({_id:user[0]._id},"userdata");
                    res.send(token);
                } else {
                    res.send(err,"error")
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send("something went wrong");
    }
})

module.exports={
    userRouter
}