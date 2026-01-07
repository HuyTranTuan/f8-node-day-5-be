const pool = require("mysql2/promise");

class AuthModel {
  register = async (userData) => {
    const result = await pool.query(
      `insert into users (email, password) values (?, ?)`,
      [userData.email, userData.passord]
    );
    return result;
  };

  login = async (userData) => {
    const result = await pool.query(
      `select id, email from users where id = ?, email = ?, password = ?`,
      [userData.id, userData.email, userData.passord]
    );
    return result;
  };
}

module.exports = new AuthModel();
