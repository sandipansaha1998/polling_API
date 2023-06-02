const Question = require("../../../models/question");
const Option = require("../../../models/option");
const User = require("../../../models/user");
const { default: mongoose } = require("mongoose");

// Create question
module.exports.create = async function (req, res) {
  try {
    // Fetches user requested
    let userID = req.user.id;
    let user = await User.findById(userID);

    if (!user) {
      return res.status(401).json({
        message: "No user found",
      });
    }
    let newQuestion = {
      title: req.body.title,
      user: userID,
    };
    // Creates the question
    let question = await Question.create(newQuestion);
    // Creates the options if sent with questions
    for (let option of req.body.options) {
      let optn = await Option.create({
        title: option.value,
        question: question._id,
      });
      question.options.push(optn);
    }
    question.save();
    return res.status(200).json({
      message: "Question created",
      data: {
        question: question,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: {
        message: "Internal Server Error",
      },
    });
  }
};
// Returns Question populated with user and options

module.exports.get = async function (req, res) {
  try {
    let questionID = req.params.id;
    let question = await Question.findById(questionID)
      .populate("options")
      .populate("user");

    if (!question) {
      return res.json(400, {
        message: "No Question Found",
      });
    }
    return res.json(200, {
      message: "Question Found",
      data: question,
    });
  } catch (e) {
    console.log(e);
    return res.json(500, {
      message: {
        message: "Internal Server Error",
      },
    });
  }
};

// delete
module.exports.delete = async function (req, res) {
  let question = await Question.findById(req.params.id);
  if (!question)
    return res.status(400).json({
      message: "No data Found",
    });
  // Checks if the user requested is the user who created the question
  if (question.user !== req.user._id) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  // Deletes the associated options
  for (ops of question.options) {
    let option = await Option.findById(ops);
    if (option.votes > 0) {
      return res.status(401).json({
        message: "You cannot delete the question",
      });
    }
    option.deleteOne();
  }
  question.deleteOne();

  return res.status(200).json({
    message: "Question and associated options deleted successfully",
  });
};
