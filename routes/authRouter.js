const express = require("express");
const router = express.Router();

//const registerAuth = require("../validations/register");
//const loginAuth = require("../validations/login");

const controller = require("../controllers/authController")

router.post("/reister", /* registerAuth */ controller.register);
router.post("/login", /* loginAuth */ controller.login)

module.exports = router