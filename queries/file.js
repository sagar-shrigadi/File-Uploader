import { prisma } from "../lib/prisma.js";

export const insertFile = async (
  userId,
  original_name,
  file_name,
  file_size,
  mimetype,
) => {
  return await prisma.file.create({
    data: {
      name: original_name,
      filenname: file_name,
      size: file_size,
      mimetype,
      author: { connect: { id: userId } },
    },
  });
};
export const getFileById = async (file_id) => {
  return await prisma.file.findFirst({
    where: { id: file_id },
  });
};
