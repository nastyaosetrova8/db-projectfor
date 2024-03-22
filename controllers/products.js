const { Product } = require("../models/product");
const { HttpError, ctrlWrapper } = require("../helpers");

// const getAll = async (req, res, next) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 20 } = req.query;
//   const skip = (page - 1) * limit;

//   // const filterFavorite = { owner };
//   // if (favorite !== undefined) {
//   //   filterFavorite.favorite = favorite;
//   // }
//   const result = await Product.find( {owner},
//   //   filterFavorite,
//     "-createdAt -updatedAt",
//    {
//     skip,
//     limit,
//   }
//   )
//   // .populate("owner", "name email");
//   // res.json(result);
//   .populate("owner", "name");
//   res.json({result});
// };

// -----------------------------------------------
// -------------

const getAll = async (req, res) => {
  try {
    const { page = 1, pageSize = 5, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = sort ? generateSort() : {};

    const products = await Product.find({
      $or: [
        { price: { $regex: new RegExp(search, "i") } },
        { name: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Product.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      products,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -------------
// ------------------------------------------------

const getById = async (req, res, next) => {
  const { productId } = req.params;
  // const result = await Customer.findOne({_id:id});
  const result = await Product.findById(productId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Product.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndUpdate(productId, req.body, {
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
  const { productId } = req.params;
  const result = await Product.findByIdAndRemove(productId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "product deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  // updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
