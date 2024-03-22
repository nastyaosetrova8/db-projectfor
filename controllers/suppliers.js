const { Supplier } = require("../models/supplier");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  // const { _id: owner } = req.user;

  // const { page = 1, limit = 20, favorite } = req.query;
  // const skip = (page - 1) * limit;

  // const filterFavorite = { owner };

  // if (favorite !== undefined) {
  //   filterFavorite.favorite = favorite;
  // }
  const result = await Supplier.find(
  //   filterFavorite, 
  //   "-createdAt -updatedAt",
  //  {
  //   skip,
  //   limit,
  // }
  )
  // .populate("owner", "name email");
  // res.json(result);

  .populate("name");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { supplierId } = req.params;
  // const result = await Customer.findOne({_id:id});
  const result = await Supplier.findById(supplierId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Supplier.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { supplierId } = req.params;
  const result = await Supplier.findByIdAndUpdate(supplierId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// const updateFavorite = async (req, res, next) => {
//   const { customerId } = req.params;
//   const result = await Customer.findByIdAndUpdate(customerId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

const deleteById = async (req, res, next) => {
  const { supplierId } = req.params;
  const result = await Supplier.findByIdAndRemove(supplierId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "supplier deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  // updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
