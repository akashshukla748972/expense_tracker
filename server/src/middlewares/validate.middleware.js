import CustomError from "../utils/CustomError.js";

export const validateMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = error.message;
    return next(new CustomError(message, 400));
  }
  req.body = { ...value };
  next();
};
