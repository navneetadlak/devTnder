const jwt = require('jsonwebtoken')
const User = require('../models/user')

const adminAuth = (req, res, next)=>{
    console.log("Admin auth is getting Checked!!");
    const token = "xyz";
    const isAuthorize = token === "xyz";
    
    if(!isAuthorize){
      res.status(401).send("Unautorized request");
    }else{
      next();
    }
  }

  const userAuth = async (req, res, next)=>{
    console.log("User auth is getting Checked!!");
    // read the token from the request cookies
    try{
      const {token} = req.cookies;
    if(!token){
      throw new Error("Token is not Valid")
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$264")

    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if(!user){
      throw new Error("user not found")
    }
    req.user = user;
    next();
  }catch(err){
      res.status(400).send("ERROR :"+ err.message);
    }
    
   
  }

  module.exports = {
    adminAuth, userAuth
  }