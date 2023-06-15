const Question = require("../../../models/question");
const Option = require("../../../models/option");
const User = require("../../../models/user");

module.exports.create = async function (req, res) {
  try {
    if (!req.params)
      return res.status(400).json({
        message: "Bad Request",
      });
    // The question for which the option is to be added
    let question = await Question.findById(req.params.id).populate("options");
    // No question found
    if (question == null)
      return res.status(400).json({
        message: "No question found",
      });
    // Checks if option same title exsists
    let questionJSON = question.toJSON();
    for (ops of questionJSON.options) {
      if (ops.title.match(req.body.title))
        return res.status(400).json({
          message: "Option Exsists",
        });
    }
    // Creates option
    let option = await Option.create({
      title: req.body.title,
      question: questionJSON,
    });
    // Associate the option created with the question
    question.options.push(option);
    question.save();
    questionJSON = question.toJSON();

    return res.status(200).json({
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
    // If option has no votes ,then only option can be deleted
    if (option.votes > 0) {
      return res.status(400).json({
        message: "Cannot be deleted.Vote count > 0 ",
      });
    }

    let question_id = option.question;
    // Removes the option from question
    let question = await Question.findOne(question_id);
    // Checks if the delete request is by the authorized user
    if (!question.user.equals(req.user))
      return res.status(401).json({
        message: "Unauthorized",
      });
    question = await Question.findByIdAndUpdate(question_id, {
      $pull: { options: option._id },
    });
    // Deletes the option
    option.deleteOne();
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
    let user = "";
    if (req.body.userID) {
      user = await User.findById(req.body.userID);
    }

    // Fetching the option voted for
    let option = await Option.findById(req.params.id);

    if (!option) {
      return res.status(400).json({
        message: "No options found",
      });
    }

    // if user is logged in then it is added to the users VotedQuestion feild
    if (user) {
      user.votedQuestion.set(option.question, option.id);
      user.save();
    }
    // Increamenting vout count by 1
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
