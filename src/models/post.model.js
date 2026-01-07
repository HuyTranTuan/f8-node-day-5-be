const pool = require("../config/database");

class Post {
  async findAll() {
    const [rows] = await pool.query(
      `select * from posts WHERE deleted_at IS NULL ORDER BY created_at DESC`
    );
    return rows;
  }

  async pagination(limit, offset, user_id) {
    let query = `select * from posts WHERE deleted_at IS NULL `;
    user_id ? (query += ` and user_id = ? `) : ` `;
    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?;`;
    const [rows] = await pool.query(
      query,
      user_id ? [+user_id, limit, offset] : [limit, offset]
    );
    return rows;
  }

  async count(user_id = undefined) {
    let query = `select count(*) as count from posts`;
    user_id ? (query += ` where user_id = ? `) : ` `;
    const [rows] = await pool.query(query, user_id ? [user_id] : []);

    return rows[0].count;
  }

  async findOne(id) {
    const [row] = await pool.query(`select * from posts where id = ?`, [id]);
    return row.length > 0 ? row[0] : null;
  }

  async create(postData) {
    const now = new Date();
    const [row] = await pool.query(
      `INSERT INTO posts (title, slug, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?);`,
      [postData.title, postData.slug, postData.content, now, now]
    );

    const insertId = row.insertId;
    const result = this.findOne(insertId);
    return result;
  }

  async update(id, postData) {
    const post = await this.findOne(id);

    if (!post) return null;

    const now = new Date();

    await pool.query(
      `UPDATE posts SET title = ?, slug = ?, content = ?, updated_at = ? WHERE id = ?`,
      [postData.title, postData.slug, postData.content, now, post.id]
    );

    return await this.findOne(post.id);
  }

  async destroy(id) {
    const post = await this.findOne(id);

    if (!post) return null;

    const now = new Date();
    await pool.query(`update posts set deleted_at = ? where id = ?;`, [
      now,
      post.id,
    ]);

    return post;
  }
}

module.exports = new Post();
