const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const req = require("express/lib/request");
const { validateSignUpData } = require("./src/utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")

// convert javascript object to json
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
  // validation of data
  validateSignUpData(req)
  const { firstName, lastName, emailId, password } = req.body;

  // encrypt the password
  const passwordHash = await bcrypt.hash(password, 8);

  // Creating a new instance of the user model
  const user = new User({
      firstName, lastName, emailId, password: passwordHash
    });

  // Creating a new instance of the user model
  // const user = new User({
  //   firstName: "Navneet",
  //   lastName: "Adlak",
  //   emailId: "navneet.adlak264@gmail.com",
  //   password: "123",
  // });


    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
});

app.post('/login', async (req,res)=>{
  try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid Credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password )

    if(isPasswordValid){

      // create a JWT token

      // add the token to cookies and send the response back to the user
      res.cookie("token", "hfkahkfhuefhafhhfaofefhuefhefafekfauhfuhefye");
      res.send("Login Successful")
    }else{
      throw new Error("Invalid Credentials")
    }

  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
})

app.get('/profile', async (req, res) => {
  const cookies = req.cookies;

  const {token} = cookies;
  // validate my token

  console.log(cookies);
  res.send("Reading Cookies")
})

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
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// Update data of the user APi
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more then 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED" + err.message);
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

// const sortArr = (strings) => {
//   return strings.sort((a,b)=> b.length - a.length)
// }

// app.use('/', (req, res)=>{

//   let result = sortArr(input.strings)
//   res.send(result)
// })
