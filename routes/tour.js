const express = require("express");
const router = express.Router();
const { environment } = require("../config");
const db = require("../db/models");
const { asyncHandler } = require("./utils");

router.get("/tour", asyncHandler(async (req, res, next) => {
    res.send("OK");
  }));
