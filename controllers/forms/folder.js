import { body, matchedData, validationResult } from "express-validator";
import { emptyErr } from "./signUp.js";
import {
  deleteFolderById,
  getFolderById,
  insertFolder,
  insertNestedFolder,
  updateFolderById,
} from "../../queries/folder.js";
import e from "express";

export const getNewFolder = (req, res) => {
  res.render("pages/add-folder", { path: "folders/new" });
  return;
};

const newFolderValidation = [
  body("folder_name").trim().notEmpty().withMessage(`Folder Name ${emptyErr}`),
];
export const postNewFolder = [
  newFolderValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("pages/add-folder", {
        errors: errors.array(),
        path: "folders/new",
      });
      return;
    }
    try {
      const { folder_name } = matchedData(req);
      const { id } = req.user;
      const newFolder = await insertFolder(Number(id), folder_name);
      //   console.log(`view newly created folder details`, newFolder);
      res.status(201).redirect(`/folders/${newFolder.id}`);
      return;
    } catch (error) {
      next(error);
    }
  },
];
export const getEditFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const folderToEdit = await getFolderById(Number(id));
    res.render("pages/edit-folder", { folderToEdit });
    return;
  } catch (error) {
    next(error);
  }
};
export const postEditFolder = [
  newFolderValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("pages/edit-folder", { errors: errors.array() });
      return;
    }
    try {
      const { folder_name } = matchedData(req);
      const { id } = req.params;
      await updateFolderById(Number(id), folder_name);
      res.status(204).redirect(`/folders/${id}`);
      return;
    } catch (error) {
      next(error);
    }
  },
];
export const postDeleteFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteFolderById(Number(id));
    res.status(204).redirect("/folders");
    return;
  } catch (error) {
    next(error);
  }
};
export const getNestedNewFolder = (req, res) => {
  const { folderId } = req.params;
  res.render("pages/add-folder", { path: `folders/${folderId}/new` });
  return;
};
export const postNestedNewFolder = [
  newFolderValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    const { folderId } = req.params;
    if (!errors.isEmpty()) {
      res.status(400).render("pages/add-folder", {
        errors: errors.array(),
        path: `folders/${folderId}/new`,
      });
      return;
    }
    const { folder_name } = matchedData(req);
    try {
      const newFolder = await insertNestedFolder(
        Number(req.user.id),
        Number(folderId),
        folder_name,
      );
      res.status(201).redirect(`/folders/${folderId}`);
      return;
    } catch (error) {
      next(error);
    }
  },
];
