export const adminAuth = (req, res, next)=>{
    console.log("Admin auth is getting Checked!!");
    const token = "xyz";
    const isAuthorize = token === "xyz";
    
    if(!isAuthorize){
      res.status(401).send("Unautorized request");
    }else{
      next();
    }
  }