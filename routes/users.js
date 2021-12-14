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
const { loginUser, logoutUser } = require("../auth");

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
      loginUser(req, res, user);
      res.redirect("/");
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
          return res.redirect("/");
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
  res.redirect("/login");
});
/*--------------------------------------------------------------------*/
// EXPORTS
module.exports = router;
