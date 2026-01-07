const pool = require("mysql2/promise");

class ConversationModel {
  createConversation = async (name, type = "group", participant_ids = []) => {
    const [rows] = await pool.query(``, []);
    return rows;
  };

  findAllConversation = async () => {
    const [rows] = await pool.query(``, []);
    return rows;
  };

  addParticipantsToConversation = async (user_id) => {
    const [rows] = await pool.query(``, []);
    return rows;
  };
  findAllMessagesFromConversation = async (user_id) => {
    const [rows] = await pool.query(``, []);
    return rows;
  };
  addMessageToConversation = async (user_id) => {
    const [rows] = await pool.query(``, []);
    return rows;
  };
}

module.exports = new ConversationModel();
