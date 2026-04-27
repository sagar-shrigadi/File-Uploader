import { insertFile } from "../../queries/file.js";

export const getNewFile = (req, res) => {
  res.render("pages/add-file");
};
export const postNewFile = async (req, res, next) => {
  // req.file is "file_name" file
  // req.body will contain the text fields, if there were any

  console.log("file contents: ", req.file);
  console.log("file text field", req.body);
  try {
    const { id } = req.user;
    const { originalname, filename, size, mimetype } = req.file;
    const newFile = await insertFile(
      Number(id),
      originalname,
      filename,
      size,
      mimetype,
    );
    res.redirect(`/files/${newFile.id}`);
    return;
  } catch (error) {
    next(error);
  }
};
