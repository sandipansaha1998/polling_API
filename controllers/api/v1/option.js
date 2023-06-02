const Question = require("../../../models/question");
const Option = require("../../../models/option");
const User = require("../../../models/user");
module.exports.create = async function (req, res) {
  try {
    if (!req.params)
      return res.json(400, {
        message: "Bad Request",
      });
    // The question for which the option is to be added
    let question = await Question.findById(req.params.id).populate("options");
    // No question found
    if (question == null)
      return res.json(400, {
        message: "No question found",
      });
    // Checks if option same title exsists
    let questionJSON = question.toJSON();
    for (ops of questionJSON.options) {
      if (ops.title.match(req.body.title))
        return res.json(400, {
          message: "Option Exsists",
        });
    }
    // Creates option
    let option = await Option.create({
      title: req.body.title,
      question: questionJSON,
    });
    question.options.push(option);
    question.save();
    questionJSON = question.toJSON();
    return res.json(200, {
      message: "Option created",
      data: {
        question: questionJSON,
        option: option,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    let option = await Option.findById(req.params.id);
    if (option == null)
      return res.status(400).json({
        message: "No data found",
      });

    if (option.votes > 0) {
      return res.status(400).json({
        message: "Cannot be deleted.Vote count > 0 ",
      });
    }

    let question_id = option.question;
    // Removes the option from question
    let question = await Question.findOne(question_id);
    if (question.user !== req.user)
      return res.status(401).json({
        message: "Unauthorized",
      });
    question = await Question.findByIdAndUpdate(question_id, {
      $pull: { options: option._id },
    });
    // Deletes the option
    option.deleteOne();
    console.log(question);
    return res.status(200).json({
      message: "Option Deleted",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//add vote
module.exports.addVote = async function (req, res) {
  try {
    // Fetching the user logged in
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    // Fetching the option voted for
    let option = await Option.findById(req.params.id);

    if (!option) {
      return res.status(400).json({
        message: "No options found",
      });
    }

    user.votedQuestion.set(option.question, option.id);
    user.save();
    console.log(user.votedQuestion);

    option.votes += 1;
    option.save();

    return res.status(200).json({
      message: "Voted Successfully",
      data: option,
    });
  } catch (e) {
    console.log(e);
  }
};
