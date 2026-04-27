import { body, matchedData, validationResult } from "express-validator";
import {
  deleteFileById,
  getFileById,
  insertFile,
  insertNestedFile,
  updateFileById,
} from "../../queries/file.js";
import { emptyErr } from "./signUp.js";

export const getNewFile = (req, res) => {
  res.render("pages/add-file", { path: "files/new" });
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
export const getEditFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const fileToEdit = await getFileById(Number(fileId));

    res.render("pages/edit-file", { fileToEdit });
  } catch (error) {}
};

const fileNameValidation = [
  body("new_file_name").trim().notEmpty().withMessage(`File name ${emptyErr}`),
];
export const postEditFile = [
  fileNameValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    const { fileId } = req.params;
    const fileToEdit = await getFileById(Number(fileId));
    if (!errors.isEmpty()) {
      res
        .status(400)
        .render("pages/edit-file", { errors: errors.array(), fileToEdit });
      return;
    }
    try {
      const { new_file_name } = matchedData(req);
      await updateFileById(Number(fileId), new_file_name);
      res.redirect(`/files/${fileId}`);
    } catch (error) {
      next(error);
    }
  },
];
export const postDeleteFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    await deleteFileById(Number(fileId));
    res.redirect("/folders");
  } catch (error) {
    next(error);
  }
};
export const getNestedNewFile = async (req, res, next) => {
  const { folderId } = req.params;
  res.render("pages/add-file", { path: `folders/${folderId}/files/new` });
};
export const postNestedNewFile = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const { id } = req.user;
    const { originalname, filename, size, mimetype } = req.file;
    await insertNestedFile(
      Number(id),
      originalname,
      filename,
      size,
      mimetype,
      Number(folderId),
    );
    // redirect to parent folder upon successful creation
    res.redirect(`/folders/${folderId}`);
    return;
  } catch (error) {
    next(error);
  }
};
