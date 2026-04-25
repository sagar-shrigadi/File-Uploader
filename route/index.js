import { Router } from "express";
import { getIndex, getLogout } from "../controllers/index.js";
import { getSignUp, postSignUp } from "../controllers/forms/signUp.js";
import { getLogin, postLogin } from "../controllers/forms/login.js";
import passport from "passport";

export const indexRouter = Router();

indexRouter.get("/logout", getLogout);
indexRouter.get("/login", getLogin);
indexRouter.post(
  "/login",
  // login validation
  postLogin,
  passport.authenticate("local", {
    successRedirect: "/folders",
    failureRedirect: "/login",
  }),
);

indexRouter.get("/sign-up", getSignUp);
indexRouter.post("/sign-up", postSignUp);

indexRouter.get("/", getIndex);
