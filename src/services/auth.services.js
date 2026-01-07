const authModel = require("../models/auth.model");

class AuthService {
  async register(userData) {
    const result = await authModel.register(userData);
    return result;
  }

  async login(userData) {
    const result = await authModel.login(userData);
    return result;
  }
}

module.exports = new AuthService();
