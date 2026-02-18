require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

if (!jwtSecret) {
	throw new Error('JWT_SECRET is not defined');
}

const jwtConfig = {
	secret: jwtSecret,
	expiresIn: jwtExpiresIn
};

module.exports = jwtConfig;
