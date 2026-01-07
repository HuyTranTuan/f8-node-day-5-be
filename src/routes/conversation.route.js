const express = require("express");
const router = express.Router();

const conversationControllers = require("../controllers/conversation.controller");

router.get("/", conversationControllers.getAllConversation);
router.post("/", conversationControllers.createConversation);
router.post(
  "/:id/participants",
  conversationControllers.addParticipantsToConversation
);
router.get(
  "/:id/messages",
  conversationControllers.getAllMessagesFromConversation
);
router.post("/:id/messages", conversationControllers.sendMessageToConversation);

module.exports = router;
