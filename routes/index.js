/*--------------------------------------------------------------------*/
// IMPORTS
const express = require("express");
const { environment } = require("../config");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
/*--------------------------------------------------------------------*/
// INIT
const router = express.Router();
/*--------------------------------------------------------------------*/
// ROUTES
/* GET users listing. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Home" });
});

/*--------------------------------------------------------------------*/
// EXPORTS
module.exports = router;
