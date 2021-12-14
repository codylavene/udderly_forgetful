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


router.post('/', csrfProtection, asyncHandler(async(req, res) => {
    const { name } = req.body
    console.log(req.params, '===================================')
    const list = await db.List.create({ name, userId: req.params.userId })
    res.send("Success")
}))





module.exports = router
