const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const req = require("express/lib/request");
const { validateSignUpData } = require("./src/utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./src/middlewares/userAuth")

// convert javascript object to json
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 8);

    // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // create a JWT token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$264");
      // add the token to cookies and send the response back to the user
      res.cookie(token);
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
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

  // Remove from Watchlist
  const handleRemoveFromWatchlist = async (id: string) => {
    try {
      // Find the symbol to remove from the watchlist
      const itemToRemove = watchlist.find((item) => item.id === id);
      if (!itemToRemove) return; // If the item is not in the watchlist, do nothing

      // Send POST request to Lambda function via API Gateway
      const response = await axios.post(
        "https://2gi08vgwv4.execute-api.ap-south-1.amazonaws.com/API/remove-watchlist", // Your API Gateway endpoint
        {
          email: user_email, // The user's email, can be dynamically retrieved if logged in
          symbol: itemToRemove.symbol, // The symbol to remove from the watchlist
        },
        {
          headers: {
            "Content-Type": "application/json", // Content type
          },
        }
      );

      // Handle successful response
      console.log(response.data.watchlist);
      if (response.status === 200) {
        const formattedWatchlist = response.data.watchlist.map(
          (symbol: string) => {
            const mockPrice = parseFloat((Math.random() * 1000).toFixed(2)); // Generate random price
            const mockChange = parseFloat((Math.random() * 10 - 5).toFixed(2)); // Generate random change (-5 to +5)
            return {
              id: symbol, // Use the symbol as ID
              symbol, // The stock symbol
              companyName: symbol, // Reuse the symbol as the company name for now
              exchange: "NSE", // Assuming all symbols are from the NSE exchange
              price: mockPrice, // Assign random price
              change: mockChange, // Assign random change
            };
          }
        );

        // Pass the formatted watchlist to the function
        setWatchlist(formattedWatchlist);
        // Update the watchlist in the frontend with the new list
        console.log(response.data.message); // Log success message
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      // Handle any error that occurs
    }
  };