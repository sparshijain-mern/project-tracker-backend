const authService = require('../services/auth.service');
const HTTP_STATUS = require('../constants/httpStatus');

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const result = await authService.login(email, password);

		return res.status(HTTP_STATUS.OK).json({
			success: true,
			message: 'Login successful',
			data: result
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	login
};
