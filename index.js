const express = require("express"); //require express to run server
const app = express();
const mongoose = require("./config/mongoose"); // Calling Mongoose Config File
const PORT = 8000; //Declaring Port Number
// used for session cookie
const session = require("express-session"); //express-session automticially encrypt data and send to cookie
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// this is to use our post data of form
app.use(express.urlencoded());


//setting up our view engine for ejs
app.set("view engine", "ejs");
app.set("views", "./views");

// session middleware
app.use(
  session({
    name: "node_auth",
    secret: "blahsomethng",
    saveUninitialized: false,   //if !user we dont save any data to cookie
    resave: false,    //if user is there we want rewrite if no data change
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

// we are telling app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use express router
app.use("/", require("./routes"));

// running project through express using port
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
