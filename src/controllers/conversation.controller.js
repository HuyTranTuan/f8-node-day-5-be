const conversationServices = require("../services/conversation.services");

const getAllConversation = async (req, res) => {
  const result = await conversationServices.getAllConversation();
  res.success(200, result);
};
const createConversation = async (req, res) => {
  const result = await conversationServices.createConversation(req.body);
  res.success(200, result);
};
const addParticipantsToConversation = async (req, res) => {
  const result = await conversationServices.addParticipantsToConversation();
  res.success(200, result);
};
const getAllMessagesFromConversation = async (req, res) => {
  const result = await conversationServices.getAllMessagesFromConversation();
  res.success(200, result);
};
const sendMessageToConversation = async (req, res) => {
  const result = await conversationServices.sendMessageToConversation();
  res.success(200, result);
};

module.exports = {
  getAllConversation,
  createConversation,
  addParticipantsToConversation,
  getAllMessagesFromConversation,
  sendMessageToConversation,
};
