import { body, validationResult, matchedData } from "express-validator";
import {
  signUpValidation,
  emptyErr,
  usernameMinLenErr,
  passwordMinLenErr,
} from "./signUp.js";

export const getLogin = (req, res) => {
  res.render("pages/login", { formAction: "login", formBtnText: "Log In" });
};
export const postLogin = [
  signUpValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.error(errors.array());
      res.status(400).render("pages/login", {
        errors: errors.array(),
        formAction: "login",
        formBtnText: "Log In",
      });
      return;
    }
    const { username, password } = matchedData(req);

    // put validated input into the req.body parameters which passport verify callback will check when authenticating users
    req.body.username = username;
    req.body.password = password;
    next();
  },
];
