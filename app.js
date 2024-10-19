 const express = require("express");

 const app = express();
 const { adminAuth } = require("./src/middlewares") 

// handle auth middleware for all GET, POST, PATCH, DELETE request
app.use('/admin', adminAuth)

 app.get('/user', (req, res) =>{
  res.send("user data sent")
 })

 app.get('/admin/getAllData', (req, res) =>{
   res.send("All Data Sent")
 });

 app.get('/admin/deleteUser', (req, res) => {
  res.send("Deleted a User")
}); 

 app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
 });