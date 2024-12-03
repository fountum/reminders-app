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
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
