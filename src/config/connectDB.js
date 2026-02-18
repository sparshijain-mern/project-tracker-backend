const pool = require('./db');

async function connectDB() {
	try {
		await pool.query('SELECT 1');
		console.log('Database connected successfully');
	} catch (error) {
		console.error('Database connection failed:', error);
		process.exit(1);
	}
}

module.exports = connectDB;
