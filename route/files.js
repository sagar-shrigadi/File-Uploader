import { Router } from "express";
import {
  getEditFile,
  getNewFile,
  postDeleteFile,
  postEditFile,
  postNewFile,
} from "../controllers/forms/file.js";
import multer from "multer";
import { downloadSelectFile, getSelectFile } from "../controllers/file.js";

export const fileRouter = Router({ mergeParams: true });

fileRouter.post("/delete/:fileId", postDeleteFile);

fileRouter.get("/edit/:fileId", getEditFile);
fileRouter.post("/edit/:fileId", postEditFile);

fileRouter.get("/new", getNewFile);

// use memory storage so as to directly upload file to supabase instead of saving to locals storage first
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// upload.single will take the "name" value of file input
fileRouter.post("/new", upload.single("file_name"), postNewFile);

fileRouter.get("/:fileId/download", downloadSelectFile);
// get specific file
fileRouter.get("/:fileId", getSelectFile);
