const projectQuery = require('../query/project.query');
const STATUS_TRANSITIONS = require('../constants/statusTransitions');
const PROJECT_STATUS = require('../constants/projectStatus');
const ERROR_MESSAGES = require('../constants/errorMessages');
const HTTP_STATUS = require('../constants/httpStatus');

class ProjectService {
	async createProject(data, user) {
		if (data.end_date && data.end_date < data.start_date) {
			const error = new Error(ERROR_MESSAGES.INVALID_DATE_RANGE);
			error.statusCode = HTTP_STATUS.BAD_REQUEST;
			throw error;
		}

		if (
			data.status &&
			!Object.values(PROJECT_STATUS).includes(data.status)
		) {
			const error = new Error(ERROR_MESSAGES.INVALID_STATUS);
			error.statusCode = HTTP_STATUS.BAD_REQUEST;
			throw error;
		}

		return await projectQuery.createProject({
			...data,
			user_id: user?.id || null
		});
	}

	async getProjects(filters) {
		return await projectQuery.getProjects(filters);
	}

	async getProjectById(id) {
		const project = await projectQuery.findById(id);

		if (!project) {
			const error = new Error(ERROR_MESSAGES.PROJECT_NOT_FOUND);
			error.statusCode = HTTP_STATUS.NOT_FOUND;
			throw error;
		}

		return project;
	}

	async updateProjectStatus(id, newStatus) {
		if (!Object.values(PROJECT_STATUS).includes(newStatus)) {
			const error = new Error(ERROR_MESSAGES.INVALID_STATUS);
			error.statusCode = HTTP_STATUS.BAD_REQUEST;
			throw error;
		}

		const project = await projectQuery.findById(id);

		if (!project) {
			const error = new Error(ERROR_MESSAGES.PROJECT_NOT_FOUND);
			error.statusCode = HTTP_STATUS.NOT_FOUND;
			throw error;
		}

		const allowedTransitions = STATUS_TRANSITIONS[project.status] || [];

		if (!allowedTransitions.includes(newStatus)) {
			const error = new Error(ERROR_MESSAGES.INVALID_STATUS_TRANSITION);
			error.statusCode = HTTP_STATUS.BAD_REQUEST;
			throw error;
		}

		return await projectQuery.updateStatus(id, newStatus);
	}

	async deleteProject(id) {
		const project = await projectQuery.findById(id);

		if (!project) {
			const error = new Error(ERROR_MESSAGES.PROJECT_NOT_FOUND);
			error.statusCode = HTTP_STATUS.NOT_FOUND;
			throw error;
		}

		await projectQuery.softDelete(id);
	}
}

module.exports = new ProjectService();
