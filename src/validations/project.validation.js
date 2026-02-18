const Joi = require('joi');
const PROJECT_STATUS = require('../constants/projectStatus');

const createProjectSchema = Joi.object({
	name: Joi.string().min(3).max(150).required(),
	description: Joi.string().allow('', null),
	client_name: Joi.string().min(2).max(150).required(),
	status: Joi.string().valid(...Object.values(PROJECT_STATUS)),
	start_date: Joi.date().required(),
	end_date: Joi.date().allow(null)
});

const updateStatusSchema = Joi.object({
	status: Joi.string()
		.valid(...Object.values(PROJECT_STATUS))
		.required()
});

module.exports = {
	createProjectSchema,
	updateStatusSchema
};
