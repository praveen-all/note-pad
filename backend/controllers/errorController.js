module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: "error",
    data: {
      message: err.message,
      err,
    },
  });
};
