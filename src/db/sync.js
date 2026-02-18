const pool = require('../config/db');
const createUsersTable = require('./tables/users.table');
const {
  createProjectStatusType,
  createProjectsTable,
} = require('./tables/projects.table');

const syncDatabase = async () => {
  try {
    console.log('🔄 Syncing database...');

    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await pool.query(createProjectStatusType);

    await pool.query(createUsersTable);
    await pool.query(createProjectsTable);

    console.log('✅ Database synced successfully');
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    throw error;
  }
};

module.exports = syncDatabase;
