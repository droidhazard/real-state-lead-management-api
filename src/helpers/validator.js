import { check } from "express-validator";

const registerValidator = [
  check("username", "username is required.").not().isEmpty(),
  check("email", "Please include a valid email.").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is required.").not().isEmpty(),
];

const loginValidator = [
  check("email", "Please include a valid email.").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is required.").not().isEmpty(),
];

export { registerValidator, loginValidator };
