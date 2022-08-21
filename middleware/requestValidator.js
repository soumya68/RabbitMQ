exports.validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(422).json({ status: false, message: error.details[0].message });
  } else {
    next();
  }
};
