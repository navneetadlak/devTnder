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

  const userAuth = (req, res, next)=>{
    console.log("User auth is getting Checked!!");
    const token = "xyz";
    const isAuthorize = token === "xyz";
    
    if(!isAuthorize){
      res.status(401).send("Unautorized request");
    }else{
      next();
    }
  }

  module.exports = {
    adminAuth, userAuth
  }