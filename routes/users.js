const express = require("express");
const router = express.Router();

const db = require("../db/models");
const {
  csrfProtection,
  asyncHandler,
  userValidators,
  loginValidators,
} = require("./utils");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser, requireAuth } = require("../auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("OK");
});

router.get("/login", csrfProtection, function (req, res, next) {
  res.render("user-login", { title: "Login", csrfToken: req.csrfToken() });
});

router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const user = await db.User.build();

    res.render("user-signup", {
      title: "Sign-up",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/signup",
  userValidators,
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const { email, firstName, lastName, username, password } = req.body;
    const user = await db.User.build({
      firstName,
      lastName,
      email,
      username,
    });
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;

      await user.save();
      await db.List.create({ name: "Personal", userId: user.id });
      await db.List.create({ name: "Work", userId: user.id });
      loginUser(req, res, user);
      return res.redirect(`/users/${user.id}`);
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      res.render("user-signup", {
        title: "Sign-up",
        errors,
        user,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // TODO: attempt to get email or username to work
    let errors = [];
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const user = await db.User.findOne({ where: email });

      if (user !== null) {
        const passwordCheck = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordCheck) {
          loginUser(req, res, user);
          return res.redirect(`/users/${user.id}`);
        }
      }
      errors.push("login failure -- wrong stuff bro");
    } else {
      errors = validationErrors.array().map((error) => error.msg);
    }

    res.render("user-login", {
      title: "Login",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);
router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/users/login");
});

router.get(
  "/:userId(\\d+)",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const lists = await db.List.findAll({ where: { userId: userId } });
    const tasks = await db.Task.findAll({ where: { userId: userId } });
    console.log(tasks);
    if (tasks) {
      res.render("user-home", { csrfToken: req.csrfToken(), lists, tasks });
    } else {
      res.render("user-home", { csrfToken: req.csrfToken(), lists });
    }
  })
);
/*--------------------------------------------------------------------*/
// EXPORTS
module.exports = router;
