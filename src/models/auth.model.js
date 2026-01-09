const pool = require("../config/database");

class AuthModel {
  createUser = async (email, password) => {
    const [{ insertId }] = await pool.query(
      `insert into users (email, password) values (?, ?);`,
      [email, password]
    );
    return insertId;
  };

  findUserByEmailAndPassword = async (email, password) => {
    const [result] = await pool.query(
      `select id, email from users where email = ? and password = ?;`,
      [email, password]
    );
    return result[0];
  };
}

module.exports = new AuthModel();
