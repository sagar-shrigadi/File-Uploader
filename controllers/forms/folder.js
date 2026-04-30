import { body, matchedData, validationResult } from "express-validator";
import { emptyErr } from "./signUp.js";
import {
  deleteFolderById,
  getAllNestedFilesInFolderById,
  getFolderById,
  insertFolder,
  insertNestedFolder,
  updateFolderById,
} from "../../queries/folder.js";
import e from "express";
import { supabaseStorage } from "../../lib/supabse.js";

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
      const userId = Number(req.user.id);
      const newFolder = await insertFolder(userId, folder_name);
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
    const folderId = Number(req.params.id);
    if (isNaN(folderId)) {
      return res
        .status(404)
        .render("pages/404", { message: "Invalid Folder ID" });
    }
    const folderToEdit = await getFolderById(folderId);
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
      const folderId = Number(req.params.id);
      if (isNaN(folderId)) {
        return res
          .status(404)
          .render("pages/404", { message: "Invalid Folder ID" });
      }
      await updateFolderById(folderId, folder_name);
      res.status(204).redirect(`/folders/${folderId}`);
      return;
    } catch (error) {
      next(error);
    }
  },
];
export const postDeleteFolder = async (req, res, next) => {
  try {
    const folderId = Number(req.params.id);
    if (isNaN(folderId)) {
      return res
        .status(404)
        .render("pages/404", { message: "Invalid Folder ID" });
    }
    const allFiles = await getAllNestedFilesInFolderById(folderId);
    // console.log("all nested files", allFiles);
    allFiles.forEach(async (file) => {
      const { data, error } = await supabaseStorage
        .from("images")
        .remove([`${file.url}`]);
      if (error) throw error;
    });
    await deleteFolderById(folderId);
    res.status(204).redirect("/folders");
    return;
  } catch (error) {
    next(error);
  }
};
export const getNestedNewFolder = (req, res) => {
  const { folderId } = req.params;
  if (isNaN(folderId)) {
    return res
      .status(404)
      .render("pages/404", { message: "Invalid Folder ID" });
  }
  res.render("pages/add-folder", { path: `folders/${folderId}/new` });
  return;
};
export const postNestedNewFolder = [
  newFolderValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    const { folderId } = req.params;
    if (isNaN(folderId)) {
      return res
        .status(404)
        .render("pages/404", { message: "Invalid Folder ID" });
    }
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
