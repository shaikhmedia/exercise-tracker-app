const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Find the exercises in database
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// Add the exercises in database
router.route("/add").post((req, res) => {
  // Get the data from request body
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  // Initiate new exercise with Exercise model
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  // Save new exercise to mongodb
  newExercise
    .save()
    .then(() => res.json("Exercise added"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// Delete an exercies
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// Update an exercise
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      // If a field is updated then update the value else keep the old value
      (exercise.username = req.body.username
        ? req.body.username
        : exercise.username),
        (exercise.description = req.body.description
          ? req.body.description
          : exercise.description),
        (exercise.duration = req.body.duration
          ? req.body.duration
          : exercise.duration),
        (exercise.date = req.body.date ? req.body.date : exercise.date);

      // Save the exercise to mongodb
      exercise
        .save()
        .then(() => res.json("Exercise updated"))
        .catch((err) => res.status(400).json(`Error ${err}`));
    })
    .catch((err) => res.status(400).json(`Error ${err}`));
});

module.exports = router;
