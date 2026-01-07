const userModel = require("../models/user.model");
const paginationServices = require("./pagination.services");

class UserService {
  model = userModel;

  constructor() {
    paginationServices.apply(this);
  }

  getAll = async () => {
    const rows = await userModel.findAll();
    return rows;
  };

  getOne = async (id) => {
    const result = await userModel.findOne(id);
    return result;
  };

  create = async (postData) => {
    const result = await userModel.create(postData);
    return result;
  };

  update = async (id, postData) => {
    const result = await userModel.update(id, postData);
    return result;
  };

  destroy = async (id) => {
    const result = await userModel.destroy(id);
    return result;
  };
}

module.exports = new UserService();
