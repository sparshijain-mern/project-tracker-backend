const validate = require('../middlewares/validation.middleware');
const { loginSchema } = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
