// Express
const express = require("express");
const port = 8000;
const app = express();
const cors = require("cors");

// Allowing CORS requests//Remember to change the allowed orgin
app.use(cors());

// Socket connection
const pollResultServer = require("http").Server(app);
const pollResultSocket =
  require("./config/poll_results_sockets").poll_result_socket(pollResultServer);
const socketPort = 5050;

pollResultServer.listen(socketPort, (err) => {
  if (err) {
    console.log("Error in starting server");
    return;
  }
  console.log(`Socket successfully listen on port ${socketPort}`);
});

// Passport
const passport = require("passport");
const jwt = require("./config/passport-jwt-strategy");

// Database Connection
const db_connection = require("./config/mongoose");

// Parsers
app.use(express.urlencoded());
app.use(express.json({ extended: true }));

// Routes
app.use("/", require("./routes"));

// Initialise Passport
app.use(passport.initialize());

// Server
app.listen(port, function (err) {
  if (err) {
    console.log(`Server Failed to start . Error Encountered : ${err} `);
    return;
  }

  console.log(`Server started succesfully`);
});
