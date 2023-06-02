const mongoose = require("mongoose");

//Schema Definition

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    password: {
      type: String,
      required: true,
    },
    // Mapped options to voted questions
    votedQuestion: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

//Model Definition
const users = mongoose.model("User", UserSchema);
module.exports = users;
