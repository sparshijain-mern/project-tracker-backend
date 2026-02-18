const ERROR_MESSAGES = require('../constants/errorMessages');
const HTTP_STATUS = require('../constants/httpStatus');

const errorMiddleware = (err, res) => {
	const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

	const response = {
		success: false,
		message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR
	};

	if (process.env.NODE_ENV === 'development') {
		response.stack = err.stack;
	}

	res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
