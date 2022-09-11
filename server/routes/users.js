const express = require("express");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const {
  loginValidator,
  registerValidator,
} = require("../validators/validator");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { errors, isValid } = registerValidator(req.body);
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    const { firstName, lastName, password, emial } = req.body;

    const registerUser = new Users({
      firstName,
      lastName,
      emial,
      password,
      createdAt: new Date(),
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(registerUser.password, salt, (hasherr, hash) => {
        if (err || hasherr) {
          res.json({ message: hasherr, success: false });
          return;
        }
        registerUser.password = hash;
        registerUser
          .save()
          .then(() => {
            res.json({ message: "User created succesfully", success: true });
          })
          .catch((err) => res.json({ message: err.message, success: false }));
      });
    });
  }
});

module.exports = router;
