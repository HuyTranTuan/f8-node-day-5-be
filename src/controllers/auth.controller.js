const authService = require("../services/auth.services");

const register = async (req, res) => {
  const result = await authService.register(req.body);
  res.success(201, result);
};

const login = async (req, res) => {
  const result = await authService.login(req.body);
  res.success(200, result);
};

module.exports = { register, login };
