const { isValidObjectId } = require("mongoose");

const { HttpErrors } = require("../helpers");


const isValidIdProduct = (req, res, next) => {
  const { productId } = req.params;

  if (!isValidObjectId(productId)) {
    next(HttpErrors(400, `${productId} is not valid id`));
  }
  next();
};

module.exports = isValidIdProduct;
