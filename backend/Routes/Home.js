const express = require("express");
const { User } = require("../Database/Models/user");
const { getJWT } = require("../Utils/auth");
const router = express.Router();

/*
  Expects req body {username: "", password: ""}
  Return a response msg, jwt, and user id
 */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ err: "Invalid username." });
    const valid = await user.isValidPassword(req.body.password);
    if (valid) {
      const jwt = getJWT(user._id);
      res.json({ jwt: jwt });
    } else {
      res.status(404);
      res.json({ err: "Invalid password." });
    }
  } catch (err) {
    console.log("err :>> ", err);
    res.status(400).json(err);
  }
});

router.post("/signup", async (req, res) => {
  // Validate req body
  let errors = "";

  // fields exists
  if (req.body.name.length < 1) errors += "Name field cannot be empty.\n";
  if (req.body.email.length < 1) errors += "Email field cannot be empty.\n";
  if (req.body.username.length < 1)
    errors += "Username field cannot be empty.\n";
  if (req.body.password.length < 1)
    errors += "Password field cannot be empty.\n";

  // email uniqueness
  const sameEmail = await User.findOne({ email: req.body.email });
  if (sameEmail) errors += "Email already exists.\n";

  // username uniqueness
  const sameUsername = await User.findOne({ username: req.body.username });
  if (sameUsername) errors += "Username already exists.\n";

  // password strength
  // if (req.body.password.length > 0 && req.body.passwordStrength < 2)
  //   errors += "Password cannot be too short or weak.\n";

  console.log("errors :>> ", errors);

  // report the error, without the trailing \n
  if (errors) return res.status(400).json({ err: errors });

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    newUser.following.push(newUser._id);
    await user.save();
    const jwt = getJWT(newUser._id);
    res.json({
      jwt: jwt,
    });
  } catch (err) {
    if (err.errors.email) {
      res.status(400).json({ err: "Invalid email." });
    }
    res.status(400).json({ err: "Error creating account." });
  }
});

module.exports = router;
