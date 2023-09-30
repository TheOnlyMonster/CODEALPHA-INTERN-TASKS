const { validationResult } = require("express-validator");
const isValidationError = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    error.statusCode = 422;
    return next(error);
  }
  next();
};
module.exports = isValidationError;
