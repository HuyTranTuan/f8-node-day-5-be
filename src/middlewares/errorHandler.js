const errorHandler = (err, _, res) => {
  res.error(500, err.message, err);
};

module.exports = errorHandler;
