const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

let remindersController = {
  list: async (req, res) => {
    if (!req.user){
      res.redirect('/login');
      return;
    } 
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
    if (!req.user){
      res.redirect('/login');
      return;
    } 
    const reminder = await db.reminder.findUnique({
      where: {
        id:Number(req.params.id),
        userId: req.user.id,
      }
    })

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
    if (!req.user){
      res.redirect('/login');
      return;
    } 
    let reminderToFind = Number(req.params.id);
    const reminder = await db.reminder.findUnique(
      {
        where: {
          id:reminderToFind,
          userId: req.user.id,
        }
      }
    );
    if (reminder != undefined) {
      res.render("reminder/edit", { reminderItem: reminder });
    } else {
      res.redirect('/reminders');
    }
  },

  update: async (req, res) => {
    if (!req.user){
      res.redirect('/login');
      return;
    } 
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
    if (!req.user){
      res.redirect('/login');
      return;
    } 
    const deleteReminder = await db.reminder.delete({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    })

    res.redirect("/reminders");
  },
};

module.exports = remindersController;
