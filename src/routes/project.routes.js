const validate = require('../middlewares/validation.middleware');
const {
	createProjectSchema,
	updateStatusSchema
} = require('../validations/project.validation');
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const express = require('express');
const router = express.Router();

router.use(authMiddleware);

router.post(
	'/',
	validate(createProjectSchema),
	projectController.createProject
);

router.patch(
	'/:id/status',
	validate(updateStatusSchema),
	projectController.updateProjectStatus
);

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
