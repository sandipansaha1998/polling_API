module.exports.poll_result_socket = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "https://quick-poll-india.netlify.app/",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", function (socket) {
    // If vote is recorded

    socket.on("voted", (questionID) => {
      console.log("Voted for", questionID);
      socket.broadcast.emit("recordedVote", questionID);
    });
  });
};
