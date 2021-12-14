const csrf = require("csurf");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
/*--------------------------------------------------------------------*/

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const userValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required")
    .isLength({ max: 100 })
    .withMessage("First Name must not be more than 100 characters long"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required")
    .isLength({ max: 100 })
    .withMessage("Last Name must not be more than 100 characters long"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required")
    .isLength({ max: 100, min: 2 })
    .withMessage(
      "Username must not be more than 100 characters long or less than 2 characters"
    )
    .custom((value) => {
      return db.User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided username is already in use by another account"
          );
        }
      });
    }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Invalid email address")
    .isLength({ max: 100 })
    .withMessage("Email must not be more than 100 characters long")
    .isEmail()
    .withMessage("Email is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided email is already in use by another account"
          );
        }
      });
    }),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];

const loginValidators = [
  check("emailAddress")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password"),
];

module.exports = {
  asyncHandler,
  csrfProtection,
  userValidators,
  loginValidators,
};
