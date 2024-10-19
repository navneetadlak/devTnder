const express = require("express");

const app = express();
//  const { adminAuth, userAuth } = require("./src/middlewares/auth")

// handle auth middleware for all GET, POST, PATCH, DELETE request
// app.use('/admin', adminAuth)

app.get("/getUserData", (req, res) => {
  try {
    // Logic of DB call and get user data
    throw new Error("hkfhakhf");
    res.send("user Data sent");
  } catch (err) {
    res.status(500).send("Some Error Contact Support Team");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // log your error message
    res.status(500).send("something went wrong");
  }
});

// app.post('/user/login', (req, res)=> {
//   res.send("user logged in successfully")
// })

//  app.get('/user/data', userAuth, (req, res) =>{
//   res.send("user data sent")
//  })

//  app.get('/admin/getAllData', (req, res) =>{
//    res.send("All Data Sent")
//  });

//  app.get('/admin/deleteUser', (req, res) => {
//   res.send("Deleted a User")
// });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
