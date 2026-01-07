const userModel = require("../models/user.model");
const paginationServices = require("./pagination.services");

class UserService {
  model = userModel;

  constructor() {
    paginationServices.apply(this);
  }

  async getUserByEmail(email) {
    const result = userModel.getUserByEmail(email);
    return result;
  }
}

module.exports = new UserService();
