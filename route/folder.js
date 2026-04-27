import { Router } from "express";
import {
  postDeleteFolder,
  getEditFolder,
  getNewFolder,
  postEditFolder,
  postNewFolder,
  getNestedNewFolder,
  postNestedNewFolder,
} from "../controllers/forms/folder.js";
import { getAllFolders, getSelectFolder } from "../controllers/folder.js";

export const folderRouter = Router({ mergeParams: true });

folderRouter.post("/delete/:id", postDeleteFolder);

folderRouter.get("/edit/:id", getEditFolder);
folderRouter.post("/edit/:id", postEditFolder);

folderRouter.get("/new", getNewFolder);
folderRouter.post("/new", postNewFolder);

folderRouter.get("/:folderId/new", getNestedNewFolder);
folderRouter.post("/:folderId/new", postNestedNewFolder);

folderRouter.get("/:id", getSelectFolder);
folderRouter.get("/", getAllFolders);
