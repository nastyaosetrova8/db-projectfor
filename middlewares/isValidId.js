const { isValidObjectId } = require("mongoose");

const { HttpErrors } = require("../helpers");

const isValidId = (req, res, next) => {
  const { customerId } = req.params;

  if (!isValidObjectId(customerId)) {
    next(HttpErrors(400, `${customerId} is not valid id`));
  }
  next();
};

const isValidIdProduct = (req, res, next) => {
  const { productId } = req.params;

  if (!isValidObjectId(productId)) {
    next(HttpErrors(400, `${productId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
module.exports = isValidIdProduct;
