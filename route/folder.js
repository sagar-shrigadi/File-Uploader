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
import {
  getNestedNewFile,
  postNestedNewFile,
} from "../controllers/forms/file.js";
import multer from "multer";

export const folderRouter = Router({ mergeParams: true });

folderRouter.post("/delete/:id", postDeleteFolder);

folderRouter.get("/edit/:id", getEditFolder);
folderRouter.post("/edit/:id", postEditFolder);

folderRouter.get("/new", getNewFolder);
folderRouter.post("/new", postNewFolder);

folderRouter.get("/:folderId/new", getNestedNewFolder);
folderRouter.post("/:folderId/new", postNestedNewFolder);

folderRouter.get("/:folderId/files/new", getNestedNewFile);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
folderRouter.post(
  "/:folderId/files/new",
  upload.single("file_name"),
  postNestedNewFile,
);

folderRouter.get("/:id", getSelectFolder);
folderRouter.get("/", getAllFolders);
