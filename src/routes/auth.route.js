const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth.controller");
const validateUser = require("../middlewares/user/validateUser");
const authRequired = require("../middlewares/auth/required");

router.post("/register", validateUser, authControllers.register);
router.post("/login", validateUser, authControllers.login);
router.get("/me", authRequired, authControllers.getCurrentUser);

module.exports = router;
