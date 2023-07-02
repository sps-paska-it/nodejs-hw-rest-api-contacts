const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  error.status(400);
  console.log(name);
  console.log(code);
  next();
};

module.exports = handleMongooseError;
