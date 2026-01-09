const authService = require("../services/auth.services");

const register = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.register(email, password);
  res.success(201, result);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  if (!user) res.error(401, "Unauthorized!");
  res.success(200, user, token);
};

const getCurrentUser = async (req, res) => {
  res.success(200, req.user);
};

module.exports = { register, login, getCurrentUser };
