const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema with the properties of the user
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model with the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
