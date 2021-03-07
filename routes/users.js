const router = require("express").Router();
let User = require("../models/user.model");

// Get users from database
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// Add user to database
router.route("/add").post((req, res) => {
  // Get the data from request body
  const username = req.body.username;

  // Initiate user model with the username
  const newUser = new User({ username });

  // Save new user to mongodb
  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

module.exports = router;
