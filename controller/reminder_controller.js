const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

let remindersController = {
  list: async (req, res) => {
    const reminders = await db.reminder.findMany(
      {
        where: {userId: req.user.id}
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

  create: async (req, res) => {
    const reminder = await db.reminder.create({
      data: {
          title: req.body.title,
          description: req.body.description,
          completed: false,
          userId: req.user.id,
      }
    })
    res.redirect("/reminders");
  },

  edit: async (req, res) => {
    let reminderToFind = Number(req.params.id);
    const reminder = await db.reminder.findUnique(
      {
        where: {id:reminderToFind}
      }
    );
    if (reminder != undefined) {
      res.render("reminder/edit", { reminderItem: reminder });
    } else {
      res.redirect('/reminders');
    }
  },

  update: async (req, res) => {
    const updateReminder = await db.reminder.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        completed: Boolean(req.body.completed),
        userId: req.user.id,
      }
    }) 

    res.redirect("/reminders");
  },

  delete: async (req, res) => {
    const deleteReminder = await db.reminder.delete({
      where: {
        id: Number(req.params.id),
      },
    })

    res.redirect("/reminders");
  },
};

module.exports = remindersController;
