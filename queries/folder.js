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
export const insertNestedFolder = async (
  userId,
  parentFolderId,
  folder_name,
) => {
  return await prisma.folder.create({
    data: {
      name: folder_name,
      author: { connect: { id: userId } },
      parent: { connect: { id: parentFolderId } },
    },
  });
};
export const getFolderById = async (folder_id) => {
  return await prisma.folder.findFirst({
    where: { id: folder_id },
    include: { child: { orderBy: { id: "asc" } } },
  });
};
export const getAllRootFoldersByUser = async (user_id) => {
  // only root folders made by user with <user_id> (root = folders with no parentId)
  return await prisma.folder.findMany({
    where: { authorId: user_id, parentId: null },
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
