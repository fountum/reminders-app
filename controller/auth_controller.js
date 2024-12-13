const { PrismaClient } = require("@prisma/client"); 
const database = new PrismaClient(); 
const passport = require("../middleware/passport");

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
  }),

  ensureAdmin: (req, res, next) => {
    if (req.user && req.user.admin) {
      return next();
    } else {
      res.redirect("/auth/login");
    }
  },

  adminPage: async (req, res) => {
    try {
      const userList = await database.user.findMany();
      req.sessionStore.all((err, allSessions) => {
        if (err) {
          console.error("Error can't retreieve sessions:", error);
          return res.status(500).send("Error retrieving sessions");
        }
        let sessionUsers = [];
        for (let sessionKey in allSessions) {
          if (allSessions[sessionKey].passport && allSessions[sessionKey].passport.user) {
            sessionUsers.push({
              sessionId: sessionKey,
              userId: allSessions[sessionKey].passport.user,
            });
          }
        }
        res.render("auth/admin", { users: userList, userSessions: sessionUsers });
      });
    } catch (err) {
      console.error("Error can't retreieve users:", error);
      res.status(500).send("Error can't get users");
    }
  },

  destroySession: (req, res) => {
    const userId = req.body.userId;
    req.sessionStore.all((error, allSessions) => {
      if (err) {
        console.error("Error can't retreieve sessions:", error);
        return res.status(500).send("Error retrieving sessions");
      }
      let foundSessionID = null;
      for (let sessionKey in allSessions) {
        if (allSessions[sessionKey].passport && allSessions[sessionKey].passport.user === userId) {
          foundSessionID = sessionKey;
          break;
        }
      }
      if (foundSessionID) {
        req.sessionStore.destroy(foundSessionID, (error) => {
          if (err) {
            console.error("Error destroying a session:", error);
            res.status(500).send("Error destroying a session");
          } else {
            console.log("Session destroyed for user ID:", userId);
            res.redirect("/admin");
          }
        });
      } else {
        console.log("No session was found for the user ID:", userId);
        res.status(404).send("No session was found");
      }
    });
  },
};

module.exports = authController;
