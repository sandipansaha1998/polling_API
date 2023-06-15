const mongoose = require("mongoose");
const env = require("../config/enviroment");
// Connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`);

// Aquire the connection to check if the connection is successfull
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
db.once("open", function () {
  console.log(`Connected to Database :: MongoDB ` + env.db);
});

module.exports = db;
