const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const passport = require("passport");
const utils = require("../utils");

//const Tweets = require('../models/tweets');

router.get("/", (req, res) => {
  console.log("Directed to main page......");
  res.render("index", { authenticated: req.user });
});

router.get("/login", (req, res) => {
  console.log("Directed to login page......");
  res.render("login");
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body;
  if (password === confirmPassword) {
    try {
      let user = await Users.findOne({ email });
      let user2 = await Users.findOne({ username });
      if (user || user2) {
        return res.status(400).json({
          msg: "User already exists."
        });
      }

      Users.register(
        new Users({ email: email, username: username }),
        password,
        (err, user) => {
          if (err) {
            return next(err);
          }

          passport.authenticate("local")(req, res, () => {
            return res.redirect("/");
          });
        }
      );

      //res.send(req.body);
    } catch (err) {
      res.status(500).send("Server Error.");
    }
  } else {
    return next({ message: "Password does not match" });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
