const express = require("express");
const router = express.Router();

const postControllers = require("../controllers/post.controller");
const postValidate = require("../middlewares/post/validatePost");

router.get("/", postControllers.getAll);
router.get("/:id", postControllers.getOne);
router.post("/", postValidate, postControllers.create);
router.put("/:id", postValidate, postControllers.update);
router.patch("/:id", postValidate, postControllers.update);
router.delete("/:id", postControllers.destroy);

module.exports = router;
