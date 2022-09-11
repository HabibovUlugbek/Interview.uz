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

router.post("/login", async (req, res) => {
  const { errors, isValid } = loginValidator(req.body);

  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) res.json({ message: "Email doesn't exists", success: false });
      else
        bcrypt.compare(req.body.password, user.password).then((success) => {
          if (!success) {
            res.json({ message: "Invalid password" });
          } else {
            const payload = {
              id: user._id,
              name: user.firstName,
            };
            jwt.sign(
              payload,
              process.env.APP_SECRET,
              { expiresIn: 2155926 },
              (err, token) => {
                res.json({
                  user,
                  token: "Bearer token: " + token,
                  success: true,
                });
              }
            );
          }
        });
    });
  }
});

router.post("/register", async (req, res) => {
  const { errors, isValid } = registerValidator(req.body);
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    const { firstName, lastName, password, email } = req.body;

    const registerUser = new Users({
      firstName,
      lastName,
      email,
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

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (!user) {
      res.json({ message: "User not found", success: false });
    } else {
      res.json({ user, success: true });
    }
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

module.exports = router;
