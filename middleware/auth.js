
const Users = require("../models/users.schema")
//CHECK DUPLICATE EMAIL
const checkDuplicateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userData = await Users.findOne({ email }, { email: 1, firstName: 1, lastName: 1 });
    if (!userData) next();
    else
      res.status(400).json({ status: false, message: "Duplicate email" });
  } catch (err) {
    res.status(501).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = { checkDuplicateEmail };
