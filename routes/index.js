const express = require('express');
const router = express.Router();

const db = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First name is required')
    .isLength({ max: 100 })
    .withMessage('First Name must not be more than 100 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last name is required')
    .isLength({ max: 100 })
    .withMessage('Last Name must not be more than 100 characters long'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .isLength({ max: 100, min: 2 })
    .withMessage('Username must not be more than 100 characters long or less than 2 characters')
    .custom((value) => {
      return db.User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already in use by another account');
          }
        });
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Invalid email address')
    .isLength({ max: 100 })
    .withMessage('Email must not be more than 100 characters long')
    .isEmail()
    .withMessage('Email is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided email is already in use by another account');
          }
        });
    }),

  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
];



/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('OK');
});

router.get('/login', csrfProtection, function (req, res, next) {
  res.render('user-login', { title: 'Login', csrfToken: req.csrfToken() });
});

router.get('/signup', csrfProtection, asyncHandler(async (req, res, next) => {
  const user = await db.User.build()

  res.render('user-signup', { title: 'Sign-up', user, csrfToken: req.csrfToken() })
})
)

router.post('/signup', userValidators, csrfProtection, asyncHandler(async (req, res, next) => {
  const { email, firstName, lastName, username, password } = req.body
  const user = await db.User.build({
    firstName, lastName, email, username
  })
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10)
    user.hashedPassword = hashedPassword

    await user.save()
    // TODO login user
    res.redirect('/')
  } else {
    const errors = validationErrors.array().map((error) => error.msg)
    res.render('user-signup', { title: 'Sign-up', errors, user, csrfToken: req.csrfToken() })
  }
})
)

module.exports = router;
