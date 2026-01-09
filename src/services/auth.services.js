const authModel = require("../models/auth.model");
const jwtConfig = require("../config/jwt");

const jwt = require("jsonwebtoken");

class AuthService {
  async register(email, password) {
    const insertId = await authModel.createUser(email, password);
    const newUser = {
      insertId,
      email,
    };
    return newUser;
  }

  async login(email, password) {
    const user = await authModel.findUserByEmailAndPassword(email, password);
    const payload = {
      sub: user.id,
      exp: Date.now() + 60 * 60 * 1000,
    };
    const token = jwt.sign(payload, jwtConfig.secret);
    return {
      user,
      token: {
        access_token: token,
        access_token_ttl: 3600,
      },
    };
  }
}

module.exports = new AuthService();
