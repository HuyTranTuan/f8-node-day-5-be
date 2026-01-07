const conversationModel = require("../models/conversation.model");

class ConversationService {
  getAllConversation = async () => {
    const result = await conversationModel.findAllConversation();
    return result;
  };

  createConversation = async () => {
    const result = await conversationModel.createConversation();
    return result;
  };
  addParticipantsToConversation = async () => {
    const result = await conversationModel.addParticipantsToConversation();
    return result;
  };
  getAllMessagesFromConversation = async () => {
    const result = await conversationModel.findAllMessagesFromConversation();
    return result;
  };
  sendMessageToConversation = async () => {
    const result = await conversationModel.addMessageToConversation();
    return result;
  };
}

module.exports = new ConversationService();
