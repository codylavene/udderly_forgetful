const express = require("express");
const router = express.Router();
const db = require("../db/models");

router.use(express.json());
const {
  csrfProtection,
  asyncHandler,
  userValidators,
  loginValidators,
} = require("./utils");
const { check, validationResult } = require("express-validator");

router.post(
  "/lists",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { description, listId } = req.body;
    const { userId } = req.session.auth;

    const task = await db.Task.create({ description, userId, listId });
    res.end();
  })
);

router.post(
  "/tasks",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { description, currList } = req.body;
    const { userId } = req.session.auth;
    console.log("============", currList);
    const task = await db.Task.create({
      description,
      listId: currList,
      userId,
    });
    res.send("Success");
  })
);

module.exports = router;
