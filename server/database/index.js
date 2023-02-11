const mongoose = require("mongoose");

// Setup and connect mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/bike", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
