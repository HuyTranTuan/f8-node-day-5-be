const conversationModel = require("../models/conversation.model");
const userModel = require("../models/user.model");

class ConversationService {
  getAllConversation = async (user) => {
    const result = await conversationModel.findAllConversation(user);
    return result;
  };

  createConversation = async (user, body) => {
    const { name, participants } = body;
    let type = "group";

    const participantPromises = participants.map(async (email) => {
      const foundUser = await userModel.getUserByEmail(email);
      if (foundUser) return foundUser.id;
    });

    const participantList = await Promise.all(participantPromises);
    const hasNullish = participantList.some((item) => item == null);
    if (hasNullish) return null;

    const participantListFilter = [user.id, ...participantList];

    if (participantListFilter.length < 2) return null;
    if (participantListFilter.length === 2) type = "direct";

    const participant_ids = participantListFilter.join();

    const result = await conversationModel.createConversation(user, {
      name,
      type,
      participant_ids,
    });
    return result;
  };

  addParticipantsToConversation = async (conversation_id, user, user_id) => {
    const conversation = await conversationModel.findConversation(
      conversation_id,
      user.id
    );
    if (!conversation) return null;

    const exists = conversation.participant_ids.split(",").includes(user_id);
    if (exists === true) return "Existed";

    const user_added_arr = conversation.participant_ids + "," + user_id;

    const result = await conversationModel.addParticipantsToConversation(
      conversation_id,
      user.id,
      user_added_arr
    );
    return result;
  };

  getAllMessagesFromConversation = async (user, conversation_id) => {
    const conversation = await conversationModel.findConversation(
      conversation_id,
      user.id
    );
    if (!conversation) return null;

    const conversationNoSendersInfo =
      await conversationModel.findAllMessagesFromConversation(
        user,
        conversation_id
      );
    await Promise.all(
      conversationNoSendersInfo.map(async (message) => {
        const user = await userModel.findOne(message.sender_id);
        message.user = user;
        return message;
      })
    );
    return conversationNoSendersInfo;
  };

  sendMessageToConversation = async (conversationId, user, content) => {
    const conversation = await conversationModel.findConversation(
      conversationId,
      user.id
    );
    if (!conversation) return null;

    const result = await conversationModel.addMessageToConversation(
      conversationId,
      user.id,
      content
    );
    return result;
  };
}

module.exports = new ConversationService();
