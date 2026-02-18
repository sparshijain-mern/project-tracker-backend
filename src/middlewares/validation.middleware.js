const HTTP_STATUS = require('../constants/httpStatus');

const validate = (schema, property = 'body') => {
	return (req, next) => {
		const { error, value } = schema.validate(req[property], {
			abortEarly: false,
			stripUnknown: true
		});

		if (error) {
			const err = new Error(error.details.map(d => d.message).join(', '));
			err.statusCode = HTTP_STATUS.BAD_REQUEST;
			return next(err);
		}

		req[property] = value;
		next();
	};
};

module.exports = validate;
