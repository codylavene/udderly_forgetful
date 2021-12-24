const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Sequelize } = require("../db/models");
const Op = Sequelize.Op;

// router.use(express.json());
const {
  csrfProtection,
  asyncHandler,
  userValidators,
  loginValidators,
} = require("./utils");
const { check, validationResult } = require("express-validator");
const { sequelize } = require("../db/models");

router.post(
  "/lists",
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { userId } = req.session.auth;

    const list = await db.List.create({ name, userId });

    if (list) {
      res.json(list);
    } else {
      res.json({ message: "Failed" });
    }
  })
);
router.get(
  "/tasks",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const tasks = await db.Task.findAll({
      where: { userId, completed: false },
    });
    if (tasks) {
      res.json(tasks);
    } else {
      res.json({ message: "Failed" });
    }
  })
);
router.get(
  "/tasks/complete",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const tasks = await db.Task.findAll({
      where: {
        userId,
        completed: true,
      },
    });
    if (tasks) {
      res.json(tasks);
    } else {
      res.json({ message: "Failed" });
    }
  })
);
router.get(
  "/tasks/complete/:id",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const tasks = await db.Task.findAll({
      where: {
        userId,
        listId: req.params.id,
        completed: true,
      },
    });
    if (tasks) {
      res.json(tasks);
    } else {
      res.json({ message: "Failed" });
    }
  })
);
router.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    const { description, listId } = req.body;
    const { userId } = req.session.auth;
    const task = await db.Task.create({
      description,
      listId,
      userId,
    });

    res.json({ message: "Success", task: { id: task.id } });
  })
);

router.delete("/tasks/:id(\\d+)", async (req, res, next) => {
  const task = await db.Task.findByPk(req.params.id);
  if (task) {
    await task.destroy();
    res.json({ message: "Destroyed" });
  } else {
    res.json({ message: "Failed" });
  }
});

router.get(
  "/lists/:id",
  asyncHandler(async (req, res, next) => {
    const tasks = await db.Task.findAll({
      where: {
        listId: req.params.id,
        completed: false,
      },
    });
    if (tasks) {
      res.json(tasks);
    } else {
      res.json({ message: "Failed" });
    }
  })
);
router.get(
  "/tasks/:id",
  asyncHandler(async (req, res, next) => {
    const task = await db.Task.findByPk(req.params.id, {
      include: db.List,
    });
    if (task) {
      res.json(task);
    } else {
      res.json({ message: "Failed" });
    }
  })
);
router.get(
  "/search/:searchVal(\\w+)",
  asyncHandler(async (req, res, next) => {
    console.log(req.params.searchVal);
    const tasks = await db.Task.findAll({
      where: {
        description: {
          [Op.iLike]: `${req.params.searchVal}%`,
        },
      },
    });
    if (tasks) {
      res.json(tasks);
    } else {
      res.json({ message: "Failed" });
    }
  })
);
router.delete("/lists/:id(\\d+)", async (req, res, next) => {
  const list = await db.List.findByPk(req.params.id);
  if (list) {
    await list.destroy();
    res.json({ message: "Destroyed" });
  } else {
    res.json({ message: "Failed" });
  }
});

router.patch("/tasks/:id(\\d+)", async (req, res, next) => {
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", req.body);
  const task = await db.Task.findByPk(req.params.id);
  const { completed, description, listId } = req.body;
  console.log("description++++++++++", description);
  const updated = await task.update({ completed, description, listId });
  if (updated) {
    res.json({ message: "Updated" });
  } else {
    res.json({ message: "Failed" });
  }
});

module.exports = router;
