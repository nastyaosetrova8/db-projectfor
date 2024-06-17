const { Customer } = require("../models/customer");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  try {
    // const { _id: owner } = req.user;
    const recentCustomers = await Customer.find()
      .limit(5)
      .sort({ createdAt: -1 });
    const total = await Customer.countDocuments();
    const customers = await Customer.find(
      // {owner},
      {},
      "-createdAt -updatedAt"
    ).populate("owner", "name email");
    // "owner",
    res.status(200).json({ customers, recentCustomers, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getById = async (req, res, next) => {
  const { customerId } = req.params;
  const result = await Customer.findById(customerId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  console.log(result);
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Customer.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { customerId } = req.params;
  const result = await Customer.findByIdAndUpdate(customerId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { customerId } = req.params;
  const result = await Customer.findByIdAndRemove(customerId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "customer deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
