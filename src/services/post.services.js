const postModel = require("../models/post.model");
const paginationServices = require("./pagination.services");

class PostService {
  model = postModel;
  userID = undefined;

  constructor() {
    paginationServices.apply(this);
  }

  setUserID = async (userID) => {
    this.userID = userID;
  };

  getAll = async () => {
    const rows = await postModel.findAll();
    return rows;
  };

  getOne = async (id) => {
    const result = await postModel.findOne(id);
    return result;
  };

  create = async (postData) => {
    const result = await postModel.create(postData);
    return result;
  };

  update = async (id, postData) => {
    const result = await postModel.update(id, postData);
    return result;
  };

  destroy = async (id) => {
    const result = await postModel.destroy(id);
    return result;
  };
}

module.exports = new PostService();
