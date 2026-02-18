const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }
  };
};

module.exports = validationMiddleware;
