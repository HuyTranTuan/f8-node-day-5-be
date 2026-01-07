const pool = require("../config/database");

class User {
  async pagination(limit, offset) {
    const [rows] = await pool.query(`select * from users LIMIT ? OFFSET ?;`, [
      limit,
      offset,
    ]);
    return rows;
  }

  async count() {
    const [rows] = await pool.query(`select count(*) as count from users`);
    return rows[0].count;
  }

  async getUserByEmail(email) {
    const [row] = await pool.query(`select * from users where email = ?`, [
      email,
    ]);
    return row.length > 0 ? row[0] : null;
  }
}

module.exports = new User();
