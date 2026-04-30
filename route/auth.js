import { Router } from "express";
import { getSignUp, postSignUp } from "../controllers/forms/signUp.js";
import { getLogin, postLogin } from "../controllers/forms/login.js";
import passport from "passport";

export const authRouter = Router();

authRouter.get("/login", getLogin);
authRouter.post(
  "/login",
  // login validation
  postLogin,
  passport.authenticate("local", {
    successRedirect: "/folders",
    failureRedirect: "/login",
  }),
);

authRouter.get("/sign-up", getSignUp);
authRouter.post("/sign-up", postSignUp);
