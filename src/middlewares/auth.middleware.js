const tokenUtils = require('../utils/token');
const ERROR_MESSAGES = require('../constants/errorMessages');
const HTTP_STATUS = require('../constants/httpStatus');

const authMiddleware = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			const error = new Error(ERROR_MESSAGES.TOKEN_MISSING);
			error.statusCode = HTTP_STATUS.UNAUTHORIZED;
			throw error;
		}

		const parts = authHeader.split(' ');

		if (parts.length !== 2 || parts[0] !== 'Bearer') {
			const error = new Error(ERROR_MESSAGES.TOKEN_INVALID);
			error.statusCode = HTTP_STATUS.UNAUTHORIZED;
			throw error;
		}

		const token = parts[1];

		const decoded = tokenUtils.verifyToken(token);

		req.user = decoded;

		next();
	} catch (err) {
		err.statusCode = HTTP_STATUS.UNAUTHORIZED;
		next(err);
	}
};

module.exports = authMiddleware;
