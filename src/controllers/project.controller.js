const projectService = require('../services/project.service');
const HTTP_STATUS = require('../constants/httpStatus');

const createProject = async (req, res, next) => {
	try {
		const project = await projectService.createProject(req.body, req.user);

		return res.status(HTTP_STATUS.CREATED).json({
			success: true,
			message: 'Project created successfully',
			data: project
		});
	} catch (error) {
		next(error);
	}
};

const getProjects = async (req, res, next) => {
	try {
		const projects = await projectService.getProjects(req.query);

		return res.status(HTTP_STATUS.OK).json({
			success: true,
			data: projects
		});
	} catch (error) {
		next(error);
	}
};

const getProjectById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const project = await projectService.getProjectById(id);

		return res.status(HTTP_STATUS.OK).json({
			success: true,
			data: project
		});
	} catch (error) {
		next(error);
	}
};

const updateProjectStatus = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const updatedProject = await projectService.updateProjectStatus(
			id,
			status
		);

		return res.status(HTTP_STATUS.OK).json({
			success: true,
			message: 'Project status updated successfully',
			data: updatedProject
		});
	} catch (error) {
		next(error);
	}
};

const deleteProject = async (req, res, next) => {
	try {
		const { id } = req.params;

		await projectService.deleteProject(id);

		return res.status(HTTP_STATUS.OK).json({
			success: true,
			message: 'Project deleted successfully'
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createProject,
	getProjects,
	getProjectById,
	updateProjectStatus,
	deleteProject
};
