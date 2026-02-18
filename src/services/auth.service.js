const userQuery = require('../query/user.query');
const hashUtils = require('../utils/hash');
const tokenUtils = require('../utils/token');

const ERROR_MESSAGES = require('../constants/errorMessages');
const HTTP_STATUS = require('../constants/httpStatus');

class AuthService {
	async login(email, password) {
		if (!email || !password) {
			const error = new Error(ERROR_MESSAGES.VALIDATION_FAILED);
			error.statusCode = HTTP_STATUS.BAD_REQUEST;
			throw error;
		}

		const user = await userQuery.findByEmail(email);

		if (!user) {
			const error = new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
			error.statusCode = HTTP_STATUS.UNAUTHORIZED;
			throw error;
		}

		const isMatch = await hashUtils.comparePassword(
			password,
			user.password
		);

		if (!isMatch) {
			const error = new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
			error.statusCode = HTTP_STATUS.UNAUTHORIZED;
			throw error;
		}

		const token = tokenUtils.generateToken({
			id: user.id,
			email: user.email
		});

		return {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		};
	}
}

module.exports = new AuthService();
