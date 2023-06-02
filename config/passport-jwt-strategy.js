const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

let User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "quickpoll",
  passReqToCallback: true,
};

passport.use(
  new JWTStrategy(opts, async function (req, jwtPayload, done) {
    // console.log("passport use");
    // console.log(jwtPayload);
    let user = await User.findById(jwtPayload.id);

    if (user) {
      const loggedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      req.user = loggedUser;
      done(null, loggedUser);
    } else {
      console.log("No user found");
      done(null, false);
    }
  })
);

module.exports = passport;
