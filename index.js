require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User.js")
const cookieParser = require("cookie-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

main()
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/authApp');


}

const user1 = new User({
  name: "Rohit Tripathi",
  email: "rohit123@gmail.com",
  password: "rohit@1234"
})

// user1.save()
//   .then((res) => {
//     console.log("data saved successfully");
//     console.log(res);
//   }).catch((err) => {
//     console.log(err);
//   })



app.get("/", (req, res) => {
  res.send("this is home route");
})


app.get("/signup", (req, res) => {
  res.render("signup");
})


app.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // console.log(req.body);

    const hash = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      name: username,
      email,
      password: hash,
    });

    // save user
    const savedUser = await newUser.save();
    console.log(savedUser);

    // create jwt token
    // const SECRET_KEY = "asdffgghh";
    const token = jwt.sign(
      { email },
      process.env.SECRET_KEY
    );


    res.cookie("token", token);


    res.send("user registered successfully");

  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
});

//login route
app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    // checking user exists or not
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "User does not existed"
      })
    }

    // res.status(200).json({
    //   msg: "User exists",
    //   user
    // })

    //comapre password 
    const pass = await bcrypt.compare(password, user.password);
    // wrong password
    if (!pass) {
      return res.status(401).send("Incorrect password");
    }
    //login successful

    res.status(200).send("login successful");

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Internal server error"
    })
  }
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})