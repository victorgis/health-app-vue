const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
  // return res.status(500).json({ msg: "Something went wrong, Try again!" });
};

module.exports = {
  errorHandler,
};
