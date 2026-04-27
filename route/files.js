import { Router } from "express";
import { getNewFile, postNewFile } from "../controllers/forms/file.js";
import multer from "multer";
import { getSelectFile } from "../controllers/file.js";

export const fileRouter = Router({ mergeParams: true });

// get new file upload file
fileRouter.get("/new", getNewFile);

// post the new file upload form
const upload = multer({ dest: "uploads/" });
// upload.single will take the "name" value of file input
fileRouter.post("/new", upload.single("file_name"), postNewFile);

// get specific file
fileRouter.get("/:fileId", getSelectFile);
