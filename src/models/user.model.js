const pool = require("../config/database");

class User {
  async findAll() {
    const [rows] = await pool.query(`select * from users`);
    return rows;
  }

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

  async findOne(id) {
    const [row] = await pool.query(`select * from users where id = ?`, [id]);
    return row.length > 0 ? row[0] : null;
  }

  async create(userData) {
    const [row] = await pool.query(
      `INSERT INTO users (email, password) VALUES (?, ?);`,
      [userData.email, userData.password]
    );

    const insertId = row.insertId;
    const result = this.findOne(insertId);
    return result;
  }

  async update(id, userData) {
    const user = await this.findOne(id);

    if (!user) return null;

    await pool.query(`UPDATE users SET email = ?, password = ? WHERE id = ?`, [
      userData.email,
      userData.password,
      user.id,
    ]);

    return await this.findOne(user.id);
  }

  async destroy(id) {
    const user = await this.findOne(id);

    if (!user) return null;

    await pool.query(`delete from users where id = ?;`, [user.id]);

    return user;
  }
}

module.exports = new User();
