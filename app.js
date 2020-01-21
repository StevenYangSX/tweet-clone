const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//routers
const index = require("./routers/index");
const profile = require("./routers/profile");
const tweets = require("./routers/tweets");
//passport
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("./models/users");
//import mongoose
const mongoose = require("mongoose");
//DB connection
const connectDB = require("./config/db");
//Datbase Connection
connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

//catch 404 error and forward to error handler
// app.use((req, res, next) => {
//     const err = new Error('Page Not Found');
//     err.status = 404;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     res.send(err.message);
// });

app.use(
  session({
    secret: "webdxd",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(Users.createStrategy());

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'passwd'
// },
// function(username, password, done) {
//   // ...
// }
// ));

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/", index);
app.use("/profile", profile);
app.use("/tweets", tweets);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Example app listening on port !`);
});
