const responseFormat = (_, res, next) => {
  res.success = (status = 200, data, passProps = {}) => {
    res.status(status).json({
      status: "success",
      data,
      ...passProps,
    });
  };

  res.error = (status = 500, message, error = null) => {
    res.status(status).json({
      status: "error",
      error,
      message,
    });
  };

  next();
};

module.exports = responseFormat;
