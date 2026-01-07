const validatePost = (req, res, next) => {
  const { title, slug } = req.body;
  const errors = [];

  if (!title || title.trim().length < 10)
    errors.push("Title must have at least 10 characters!");

  if (!slug || !/^[a-z0-9-]+$/.test(slug))
    errors.push("Slug must be URL-friendly (lowercase, numbers, dashes).");

  if (errors.length > 0)
    return res.error(400, "Bad request! Missing title or slug!", errors);

  next();
};

module.exports = validatePost;
