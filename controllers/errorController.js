import AppError from "../utils/appError.js";
const sendErrorDevInviroment = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};
const sendErrorProductionInviroment = (res, err) => {
  if (err.isOperationalError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("Error", err);
    res.status(500).json({
      status: "Error",
      message: "Somthing went wrong",
    });
  }
};
const handleCastError = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicated ${value},please change value and go ahead`;

  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((el) => el.message);

  const message = messages.join(". ");
  return new AppError(message, 400);
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDevInviroment(res, err);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicateError(error);
    if (err.name === "ValidationError") error = handleValidationError(error);
    sendErrorProductionInviroment(res, error);
  }
};
