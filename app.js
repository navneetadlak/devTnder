const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const req = require("express/lib/request");

// convert javascript object to json
app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the user model
  const user = new User(req.body);

  // Creating a new instance of the user model
  // const user = new User({
  //   firstName: "Navneet",
  //   lastName: "Adlak",
  //   emailId: "navneet.adlak264@gmail.com",
  //   password: "123",
  // });

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
});

// API get user by email-Id
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send(400).send("Something went wrong");
  }
});

// API feed -- get all user from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something Went wrong");
  }
});

// Delete User Api to delete a user
app.delete("/user", async (req, res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully")
  }catch (err){
    res.status(400).send("Something Went Wrong")
  }
})

// Update data of the user APi 
app.patch("/user", async (req, res)=>{
  const userId = req.body.userId;
  const data = req.body;
  try{
    const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "after", });
    res.send("User Updated Successfully");
  }catch(err){
    res.status(400).send("Something went wrong");
  }
})

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

// const sortArr = (strings) => {
//   return strings.sort((a,b)=> b.length - a.length)
// }

// app.use('/', (req, res)=>{

//   let result = sortArr(input.strings)
//   res.send(result)
// })
