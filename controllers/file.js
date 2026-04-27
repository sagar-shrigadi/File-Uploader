import { getFileById } from "../queries/file.js";

export const getSelectFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    const selectedFile = await getFileById(Number(fileId));
    res.render("pages/file-details", { selectedFile });
  } catch (error) {}
};
