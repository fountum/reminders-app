const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

let remindersController = {
  list: async (req, res) => {
    const userId = 1;
    const reminders = await db.reminder.findMany(
      {
        where: {userId: userId}
      }
    );
    res.render("reminder/index", { reminders: reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: async (req, res) => {
    let reminderToFind = Number(req.params.id);
    const reminder = await db.reminder.findUnique(
      {
        where: {id:reminderToFind}
      }
    );
    if (reminder != undefined) {
      res.render("reminder/single-reminder", { reminderItem: reminder });
    } else {
      res.redirect('/reminders');
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminder = {
      id: Number(req.params.id), // Huh?
      title: req.body.title,
      description: req.body.description,
      completed: Boolean(req.body.completed),
    };
    const index = database.cindy.reminders.findIndex((reminder) => reminder.id==req.params.id)
    database.cindy.reminders.splice(index, 1, reminder)
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
  },
};

module.exports = remindersController;
