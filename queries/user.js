import { prisma } from "../lib/prisma.js";

export const insertUser = async (username, password) => {
  return await prisma.user.create({
    data: {
      username,
      password,
    },
  });
};
export const getUserAuthDetails = async (username) => {
  return prisma.user.findUnique({
    where: { username },
    // bcoz password is globally omitted in prisma client config
    // select password explicity to be included in the results to verify
    // user entered plaintext password converting to hash matches the hash stored in db
    select: {
      id: true,
      username: true,
      password: true,
    },
  });
};
export const getUserById = async (id) => {
  return prisma.user.findFirst({
    where: { id },
  });
};
