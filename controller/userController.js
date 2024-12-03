const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const getUserByEmailIdAndPassword = async (email, password) => {
  const user = await db.user.findUnique(
    {
      where: {
        email: email.toLowerCase(),
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

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
