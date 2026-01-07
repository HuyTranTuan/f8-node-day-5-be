const postService = require("../services/post.services");
const sanitizeNumber = require("../utils/sanitizeNumber");

const getAll = async (req, res) => {
  const { page, limit, user_id } = req.query;
  const safePage = sanitizeNumber(page, 1);
  const safeLimit = sanitizeNumber(limit, 20);
  safeLimit > 500 ? (safeLimit = 500) : safeLimit;
  user_id ? await postService.setUserID(user_id) : undefined;

  const { rows, pagination } = await postService.pagination(
    safePage,
    safeLimit
  );

  res.success(200, rows, {
    pagination,
  });
};

const getOne = async (req, res) => {
  const result = await postService.getOne(req.params.id);
  result ? res.success(200, result) : res.error(404, "No post found!");
};

const create = async (req, res) => {
  const result = await postService.create(req.body);
  res.success(201, result);
};

const update = async (req, res) => {
  const result = await postService.update(req.params.id, req.body);
  result
    ? res.success(200, result)
    : res.error(404, "No post found for update!");
};

const destroy = async (req, res) => {
  const result = await postService.destroy(req.params.id);
  result
    ? res.success(200, result)
    : res.error(404, "No post found for delete!");
};

module.exports = { getAll, getOne, create, update, destroy };
