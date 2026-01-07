const express = require("express");
const router = express.Router();

const postRoute = require("./post.route");
const userRoute = require("./user.route");

router.use("/posts", postRoute);
router.use("/users", userRoute);

module.exports = router;
