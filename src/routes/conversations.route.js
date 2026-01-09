const express = require("express");
const router = express.Router();

const conversationControllers = require("../controllers/conversation.controller");
const authRequired = require("../middlewares/auth/required");

router.get("/", authRequired, conversationControllers.getAllConversation);
router.post("/", authRequired, conversationControllers.createConversation);
router.post(
  "/:id/participants",
  authRequired,
  conversationControllers.addParticipantsToConversation
);
router.get(
  "/:id/messages",
  authRequired,
  conversationControllers.getAllMessagesFromConversation
);
router.post(
  "/:id/messages",
  authRequired,
  conversationControllers.sendMessageToConversation
);

module.exports = router;
