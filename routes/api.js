const express = require("express");
const router = express.Router();
const db = require("../db/models");

// router.use(express.json());
const {
  csrfProtection,
  asyncHandler,
  userValidators,
  loginValidators,
} = require("./utils");
const { check, validationResult } = require("express-validator");

router.post(
  "/lists",
  asyncHandler(async (req, res) => {
    const { description, listId } = req.body;
    const { userId } = req.session.auth;

    const task = await db.Task.create({ description, userId, listId });
    res.end();
  })
);

router.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    const { description, listId } = req.body;
    const { userId } = req.session.auth;
    // console.log("============", listId);
    const task = await db.Task.create({
      description,
      listId,
      userId,
    });
    res.json({ message: "Success", task: { id: task.id }  });
  })
);

module.exports = router;
