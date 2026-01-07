const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth.controller");
const validateUser = require("../middlewares/user/validateUser");

router.post("/register", validateUser, authControllers.register);
router.post("/login", validateUser, authControllers.login);

module.exports = router;
