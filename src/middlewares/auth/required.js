const jwt = require("jsonwebtoken");
const { secret } = require("../../config/jwt");
const userModel = require("../../models/user.model");

const authRequired = async (req, res, next) => {
  const accessToken = req.headers?.authorization?.replace("Bearer", "")?.trim();
  const { sub, exp, iat } = jwt.verify(accessToken, secret);
  const now = Date.now();
  if (exp < now) {
    return res.error(401, "Unauthorized!");
  }
  const user = await userModel.findOne(sub);
  req.user = user;
  next();
};

module.exports = authRequired;
