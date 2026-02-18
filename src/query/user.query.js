const pool = require('../config/db');

class UserQuery {
	async findByEmail(email) {
		const query = `
      SELECT id, name, email, password
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

		const { rows } = await pool.query(query, [email]);
		return rows[0] || null;
	}

	async findById(id) {
		const query = `
      SELECT id, name, email, created_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `;

		const { rows } = await pool.query(query, [id]);
		return rows[0] || null;
	}

	async createUser({ name, email, password }) {
		const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;

		const { rows } = await pool.query(query, [name, email, password]);
		return rows[0];
	}
}

module.exports = new UserQuery();
