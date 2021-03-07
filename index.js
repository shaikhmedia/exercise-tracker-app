const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

// Initialize express
const app = express();
const port = process.env.PORT || 27348;

// URI
const uri = process.env.ATLAS_URI;

// Connect with database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database established successfully");
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

// Start the server
app.listen(port);
