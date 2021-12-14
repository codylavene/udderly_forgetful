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


router.post('/lists', csrfProtection, asyncHandler(async (req, res) => {
  const { name } = req.body
  const { userId } = req.session.auth;

  const list = await db.List.create({ name, userId })
  res.send("Success")
}))





module.exports = router
