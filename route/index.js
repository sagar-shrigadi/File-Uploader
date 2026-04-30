import { Router } from "express";
import { getIndex, getLogout } from "../controllers/index.js";

export const indexRouter = Router();

indexRouter.get("/logout", getLogout);
indexRouter.get("/", getIndex);
