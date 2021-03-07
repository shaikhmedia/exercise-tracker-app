const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema with the propertise of the exercise
const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// Create a model with the schema
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
