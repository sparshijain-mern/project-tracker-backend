require('dotenv').config();
const app = require('./app');
const syncDatabase = require('./db/sync');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await syncDatabase();

		app.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error('❌ Server failed to start:', error);
		process.exit(1);
	}
};

startServer();
