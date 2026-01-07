const userServices = require("../services/user.services");
const sanitizeNumber = require("../utils/sanitizeNumber");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const safePage = sanitizeNumber(page, 1);
  const safeLimit = sanitizeNumber(limit, 20);
  safeLimit > 500 ? (safeLimit = 500) : safeLimit;

  const { rows, pagination } = await userServices.pagination(
    safePage,
    safeLimit
  );

  res.success(200, rows, {
    pagination,
  });
};

const getOne = async (req, res) => {
  const result = await userServices.getOne(req.params.id);
  result ? res.success(200, result) : res.error(404, "No post found!");
};

const create = async (req, res) => {
  const result = await userServices.create(req.body);
  res.success(201, result);
};

const update = async (req, res) => {
  const result = await userServices.update(req.params.id, req.body);
  result
    ? res.success(200, result)
    : res.error(404, "No post found for update!");
};

const destroy = async (req, res) => {
  const result = await userServices.destroy(req.params.id);
  result
    ? res.success(200, result)
    : res.error(404, "No post found for delete!");
};

module.exports = { getAll, getOne, create, update, destroy };
