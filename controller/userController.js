const userModel = require("../models/userModel").userModel;
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const getUserByEmailIdAndPassword = async (email, password) => {
  const user = await db.user.findUnique(
    {
      where: {
        email: email,
        password: password
      }
    }
  );
  if (user) return user;
  return null;
};
const getUserById = async (id) => {
  const user = await db.user.findUnique({
    where: {id:id}
  })
  if (user) return user;
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
