
// DEPENDENCIES

// Import dependencies from .env
const mongoose = require('mongoose');
const {DATABASE_URI} = process.env

// DATABASE CONNECTION
mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URI)

// CONNECTION EVENT LISTENERS
mongoose.connection
  .on("open", () => console.log("Connected to MongoDB"))
  .on("close", () => console.log("Disconnected from MongoDB"))
  .on("error", (error) => console.log(error));
