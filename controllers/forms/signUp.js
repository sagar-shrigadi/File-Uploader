import { body, matchedData, validationResult } from "express-validator";
import * as argon2 from "argon2";
import { insertUser } from "../../queries/user.js";

export const getSignUp = (req, res) => {
  return res.render("pages/sign-up", {
    formAction: "sign-up",
    formBtnText: "Sign Up",
  });
};

export const emptyErr = `must not be empty`;
export const usernameMinLenErr = `must have at least 3 characters`;
export const passwordMinLenErr = `must be at least 6 characters`;
export const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .isLength({ min: 3 })
    .withMessage(`Username ${usernameMinLenErr}`),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(`Password ${passwordMinLenErr}`),

  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Confirm password must be same as password!`),
];
export const postSignUp = [
  signUpValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.error(errors);
      res.status(400).render("pages/sign-up", {
        errors: errors.array(),
        formAction: "sign-up",
        formBtnText: "Sign Up",
      });
      return;
    }
    const { username, password } = matchedData(req);
    try {
      const hashedPassword = await argon2.hash(password);
      await insertUser(username, hashedPassword);
      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  },
];
