const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of the user model
  const user = new User({
    firstName: "Navneet",
    lastName: "Adlak",
    emailId: "navneet.adlak264@gmail.com",
    password: "123",
  });

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(8000, () => {
      console.log("Server is listening on port 8000");
    });
  })
  .catch((err) => {
    console.error("Database Cannot be connected");
  });

//  const { adminAuth, userAuth } = require("./src/middlewares/auth")

// handle auth middleware for all GET, POST, PATCH, DELETE request
// app.use('/admin', adminAuth)

// app.get("/getUserData", (req, res) => {
//   try {
//     // Logic of DB call and get user data
//     throw new Error("hkfhakhf");
//     res.send("user Data sent");
//   } catch (err) {
//     res.status(500).send("Some Error Contact Support Team");
//   }
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     // log your error message
//     res.status(500).send("something went wrong");
//   }
// });

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
