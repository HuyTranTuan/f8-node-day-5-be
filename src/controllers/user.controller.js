const userServices = require("../services/user.services");

const getUserByEmail = async (req, res) => {
  const result = await userServices.getUserByEmail(req.params.id);
  result ? res.success(200, result) : res.error(404, "No post found!");
};

module.exports = { getUserByEmail };
