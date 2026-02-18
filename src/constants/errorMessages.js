const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  ROUTE_NOT_FOUND: 'Route not found',

  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized access',
  TOKEN_MISSING: 'Authorization token is missing',
  TOKEN_INVALID: 'Invalid or expired token',

  PROJECT_NOT_FOUND: 'Project not found',
  INVALID_STATUS: 'Invalid project status',
  INVALID_STATUS_TRANSITION: 'Invalid project status transition',
  INVALID_DATE_RANGE: 'End date must be greater than or equal to start date',

  VALIDATION_FAILED: 'Validation failed',
};

module.exports = ERROR_MESSAGES;
