const pool = require('../config/db');

class ProjectQuery {
	async createProject(data) {
		const {
			name,
			description,
			client_name,
			status = 'active',
			start_date,
			end_date,
			user_id
		} = data;

		const query = `
      INSERT INTO projects
      (name, description, client_name, status, start_date, end_date, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

		const values = [
			name,
			description,
			client_name,
			status,
			start_date,
			end_date,
			user_id
		];

		const { rows } = await pool.query(query, values);
		return rows[0];
	}

	async getProjects(filters) {
		let baseQuery = `
      SELECT *
      FROM projects
      WHERE deleted_at IS NULL
    `;

		const values = [];
		let index = 1;

		if (filters.status) {
			baseQuery += ` AND status = $${index++}`;
			values.push(filters.status);
		}

		if (filters.search) {
			baseQuery += `
        AND (name ILIKE $${index} OR client_name ILIKE $${index})
      `;
			values.push(`%${filters.search}%`);
			index++;
		}

		const sortBy = filters.sortBy || 'created_at';
		const order = filters.order === 'asc' ? 'ASC' : 'DESC';

		baseQuery += ` ORDER BY ${sortBy} ${order}`;

		const { rows } = await pool.query(baseQuery, values);
		return rows;
	}

	async findById(id) {
		const query = `
      SELECT *
      FROM projects
      WHERE id = $1
      AND deleted_at IS NULL
      LIMIT 1
    `;

		const { rows } = await pool.query(query, [id]);
		return rows[0] || null;
	}

	async updateStatus(id, status) {
		const query = `
      UPDATE projects
      SET status = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

		const { rows } = await pool.query(query, [status, id]);
		return rows[0];
	}

	async softDelete(id) {
		const query = `
      UPDATE projects
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `;

		await pool.query(query, [id]);
	}
}

module.exports = new ProjectQuery();
