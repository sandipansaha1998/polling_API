let User = require("../../../models/user");
let jwt = require("jsonwebtoken");
// Generates JSON web token on Login attempt
module.exports.createSession = async function (req, res) {
  try {
    console.log(req.body);
    // If email or password is missing
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
    // Stores users credentials from the request object
    let user = {
      email: req.body.email,
      password: req.body.password,
    };
    // Finds user with provided email in the data base
    let userData = await User.findOne({ email: user.email });
    // No user found associated with email

    if (!userData) {
      return res.status(404).json({
        message: "No user Found.Register to begin",
      });
    }
    // Validate passwords
    if (user.password != userData.password) {
      console.log("No match");

      return res.status(401).json({
        message: "Incorrect Email or Password",
      });
    }
    // Identity established . returns the JWT
    console.log("success");
    userData = await userData.toJSON();
    user = { id: userData._id, name: userData.name, email: userData.email };
    const token = jwt.sign(user, "quickpoll", {
      expiresIn: "5000000000000",
    });
    console.log(token);
    return res.status(200).json({
      message: "Sign in successful.Token is attached",
      data: {
        token: token,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Register a new User
module.exports.register = async function (req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    let newUser = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      voted: [],
    };
    // Validates if user with requested email already exsists
    let user = await User.findOne({ email: newUser.email });
    if (user) {
      return res.status(409).json({
        message: "User already registered",
      });
    }
    // Creates new user
    user = await User.create(newUser);
    return res.status(200).json({
      message: "User Succesfully Registered",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Checks if email is unique during new user registration
module.exports.getIsEmailUnique = async function (req, res) {
  let email = req.query.email;
  if (!email) {
    return res.status(400).json({
      message: "Email cannot be empty",
    });
  }
  let user = await User.findOne({ email: email });
  console.log(user);
  try {
    if (!user) {
      return res.status(200).json({
        message: "Email is Unique",
      });
    } else {
      return res.status(409).json({
        message: "Email already taken",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Checks if the user has already voted the poll

//  - if key is present : return its value which is the option id chosen.
// else return null which indicates that the question was not answered.
module.exports.getUserOption = async (req, res) => {
  // The questionID is contained in the string params and the user in the token

  // ID of the logged in user
  let user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // ID of the poll associated
  let questionID = req.params.id;

  // No questions found
  if (!user.votedQuestion.get(`${questionID}`)) {
    console.log("DID NOT VOTE");
    return res.status(200).json({
      message: "User did not vote for this poll",
      data: null,
    });
  } else {
    // user has already voted.Just return the option chosen.
    console.log(user.votedQuestion.get(`${questionID}`));

    return res.status(200).json({
      message: "User has already voted for this.",
      data: user.votedQuestion.get(`${questionID}`),
    });
  }
};
