const pool = require('../config/db');
const hashUtils = require('../utils/hash');

const seedUser = async () => {
	try {
		const email = 'admin@example.com';
		const password = 'Admin@123';
		const name = 'Admin User';

		const existingUserQuery = `
      SELECT id FROM users WHERE email = $1 LIMIT 1
    `;

		const { rows } = await pool.query(existingUserQuery, [email]);

		if (rows.length > 0) {
			console.log('Admin user already exists');
			return;
		}

		const hashedPassword = await hashUtils.hashPassword(password);

		const insertQuery = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    `;

		await pool.query(insertQuery, [name, email, hashedPassword]);

		console.log('Admin user seeded successfully');
	} catch (error) {
		console.error('Error seeding user:', error);
	}
};

module.exports = seedUser;
