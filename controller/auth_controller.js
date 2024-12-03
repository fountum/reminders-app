let database = require("../database");
let passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: 
    passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  }),

  registerSubmit:
    passport.authenticate('local-signup', {
      successRedirect: '/reminders',
      failureRedirect: '/register',
  })
  
};

module.exports = authController;
