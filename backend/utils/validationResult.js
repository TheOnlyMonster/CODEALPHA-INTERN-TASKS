const { validationResult } = require("express-validator");
const isValidationError = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    error.statusCode = 422;
    return error;
  }
  return null;
};

module.exports = isValidationError;
