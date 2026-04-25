import { prisma } from "../lib/prisma.js";

export const insertFolder = async (userId, folder_name) => {
  return await prisma.folder.create({
    data: {
      name: folder_name,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const getFolderById = async (folder_id) => {
  return await prisma.folder.findFirst({
    where: { id: folder_id },
  });
};
export const getAllFoldersByUser = async (user_id) => {
  // all folders made by user with <user_id>
  return await prisma.folder.findMany({
    where: { authorId: user_id },
    orderBy: { id: "asc" },
  });
};
export const updateFolderById = async (folder_id, new_name) => {
  return await prisma.folder.update({
    where: { id: folder_id },
    data: { name: new_name },
  });
};
export const deleteFolderById = async (folder_id) => {
  return await prisma.folder.delete({
    where: { id: folder_id },
  });
};
