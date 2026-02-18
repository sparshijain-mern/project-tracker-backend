const ERROR_MESSAGES = require('../constants/errorMessages');
const HTTP_STATUS = require('../constants/httpStatus');

const notFoundMiddleware = (req, res, next) => {
	const error = new Error(ERROR_MESSAGES.ROUTE_NOT_FOUND);
	error.statusCode = HTTP_STATUS.NOT_FOUND;
	next(error);
};

module.exports = notFoundMiddleware;
