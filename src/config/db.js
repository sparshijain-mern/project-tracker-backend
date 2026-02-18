const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
let pool;
if (isProduction) {
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false }
	});
} else {
	pool = new Pool({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		ssl: false,
		max: 10,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 2000
	});
}

pool.on('connect', () => {
	console.log('PostgreSQL connected');
});

pool.on('error', err => {
	console.error('Unexpected PG Pool Error:', err);
	process.exit(1);
});

module.exports = pool;
