require('dotenv').config();
const seedUser = require('./user.seeder');
const pool = require('../config/db');

const runSeeders = async () => {
	try {
		console.log('Running seeders...\n');

		await seedUser();

		console.log('\n Seeding completed');
		process.exit(0);
	} catch (error) {
		console.error('Seeder failed:', error);
		process.exit(1);
	}
};

runSeeders();
