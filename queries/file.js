import { prisma } from "../lib/prisma.js";

export const insertFile = async (
  userId,
  original_name,
  file_size,
  mimetype,
  file_path,
) => {
  return await prisma.file.create({
    data: {
      name: original_name,
      size: file_size,
      mimetype,
      url: file_path,
      author: { connect: { id: userId } },
    },
  });
};
export const insertNestedFile = async (
  userId,
  original_name,
  file_size,
  mimetype,
  parentId,
  file_path,
) => {
  return await prisma.file.create({
    data: {
      name: original_name,
      size: file_size,
      mimetype,
      url: file_path,
      author: { connect: { id: userId } },
      parent: { connect: { id: parentId } },
    },
  });
};
export const getFileById = async (file_id) => {
  return await prisma.file.findFirst({
    where: { id: file_id },
  });
};
export const getAllRootFilesByUser = async (userId) => {
  return await prisma.file.findMany({
    where: { authorId: userId, parentId: null },
  });
};
export const updateFileById = async (file_id, new_name) => {
  return await prisma.file.update({
    where: { id: file_id },
    data: { name: new_name },
  });
};
export const deleteFileById = async (file_id) => {
  return await prisma.file.delete({
    where: { id: file_id },
  });
};
