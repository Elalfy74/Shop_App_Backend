const express = require("express");
const router = express.Router();

const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { validateRegister, validateLogin } = require("../validation/auth");

//Register
router.post("/register", async (req, res) => {
  const { error } = validateRegister(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("email is already registerd");
  }

  user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).send("username is already registerd");
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();

    const token = savedUser.generateToken();
    res.status(201).send(token);
  } catch (err) {
    return res.status(400).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    const savedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (savedPassword !== req.body.password) {
      return res.status(400).send("Invalid email or Password");
    }

    const token = user.generateToken();
    return res.status(200).send(token);
  } catch (err) {
    return res.status(400).send("Invalid email or Password");
  }
});

module.exports = router;
