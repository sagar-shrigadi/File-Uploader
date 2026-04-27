import { Router } from "express";
import {
  getEditFile,
  getNewFile,
  postDeleteFile,
  postEditFile,
  postNewFile,
} from "../controllers/forms/file.js";
import multer from "multer";
import { getSelectFile } from "../controllers/file.js";

export const fileRouter = Router({ mergeParams: true });

fileRouter.post("/delete/:fileId", postDeleteFile);

fileRouter.get("/edit/:fileId", getEditFile);
fileRouter.post("/edit/:fileId", postEditFile);

fileRouter.get("/new", getNewFile);

const upload = multer({ dest: "uploads/" });
// upload.single will take the "name" value of file input
fileRouter.post("/new", upload.single("file_name"), postNewFile);

// get specific file
fileRouter.get("/:fileId", getSelectFile);
