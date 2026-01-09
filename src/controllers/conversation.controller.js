const conversationServices = require("../services/conversation.services");

const getAllConversation = async (req, res) => {
  const result = await conversationServices.getAllConversation(req.user);
  res.success(200, result);
};

const createConversation = async (req, res) => {
  const { user, body } = req;
  const result = await conversationServices.createConversation(user, body);
  if (!result) res.error(400, "Cannot found participants!");
  res.success(200, result);
};

const addParticipantsToConversation = async (req, res) => {
  const conversation_id = req.params.id;
  const { user, body } = req;
  const { user_id } = body;
  const result = await conversationServices.addParticipantsToConversation(
    conversation_id,
    user,
    user_id
  );
  if (!result) return res.error(404, "Cannot found!");
  if (result === "Existed")
    return res.error(400, "User has already joined the conversation!");
  res.success(200, result);
};

const getAllMessagesFromConversation = async (req, res) => {
  const { user } = req;
  const conversation_id = req.params.id;

  const result = await conversationServices.getAllMessagesFromConversation(
    user,
    conversation_id
  );
  if (!result) return res.error(404, "No conversation there!");
  res.success(200, result);
};

const sendMessageToConversation = async (req, res) => {
  const { user } = req;
  const { content } = req.body;
  const { id } = req.params;
  const result = await conversationServices.sendMessageToConversation(
    (conversationId = id),
    user,
    content
  );
  if (!result) return res.error(404, "No conversation to send!");
  res.success(200, result);
};

module.exports = {
  getAllConversation,
  createConversation,
  addParticipantsToConversation,
  getAllMessagesFromConversation,
  sendMessageToConversation,
};
