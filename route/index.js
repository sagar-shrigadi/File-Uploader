import { Router } from "express";
import { getIndex } from "../controllers/index.js";

export const indexRouter = Router();

indexRouter.get("/", getIndex);
