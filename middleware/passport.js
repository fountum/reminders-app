const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient()

// PRE EXISTING STUFF
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const localSignup = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    // check if user exists
    const user = await db.user.findUnique({
      where: {
        email: email.toLowerCase(),
      }
    })
    if (user) {
      return done(null, false, {
        message: `email taken: ${email}`
      })
    }

    // create user in db
    const newUser = await db.user.create({
        data: {
          email: email.toLowerCase(),
          password: password,
          name: req.body.name
        }
    })

    return done(null, newUser);
  }
)

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user); // creates req.user
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use('local', localLogin);
module.exports = passport.use('local-signup',localSignup);
