const pool = require("../config/database");

class ConversationModel {
  findAllConversation = async (user) => {
    const [rows] = await pool.query(
      `select * from conversations WHERE created_by = ? OR FIND_IN_SET('?', participant_ids);`,
      [user.id, user.id]
    );
    return rows;
  };

  findConversation = async (id, userId) => {
    const [rows] = await pool.query(
      `select * from conversations where id = ? and (created_by = ? OR FIND_IN_SET('?', participant_ids));`,
      [id, userId, userId]
    );
    return rows[0];
  };

  createConversation = async (user, { name, type, participant_ids }) => {
    const [{ insertId }] = await pool.query(
      `insert into conversations (created_by, name, type, participant_ids) values (?, ?, ?, ?)`,
      [user.id, name, type, participant_ids]
    );
    const conversation = this.findConversation(insertId, user.id);
    return conversation;
  };

  findAllMessagesFromConversation = async (user, conversation_id) => {
    const conversation = this.findConversation(conversation_id, user.id);
    if (!conversation) return null;

    const [rows] = await pool.query(
      `select * from messages where conversation_id = ? ORDER BY created_at DESC`,
      [conversation_id]
    );

    return rows;
  };

  addParticipantsToConversation = async (
    conversationId,
    userId,
    userAddedArr
  ) => {
    const conversation = this.findConversation(conversationId, userId);
    if (!conversation) return null;

    const [rows] = await pool.query(
      `UPDATE conversations SET participant_ids = ? WHERE id = ? AND created_by = ?;`,
      [userAddedArr, conversationId, userId]
    );
    return rows[0];
  };

  addMessageToConversation = async (conversationId, userId, content) => {
    const conversation = this.findConversation(conversationId, userId);
    if (!conversation) return null;

    const [rows] = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, content) VALUES (?, ?, ?);`,
      [conversationId, userId, content]
    );
    return rows;
  };
}

module.exports = new ConversationModel();
