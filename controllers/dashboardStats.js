// const { Customer } = require("../models/customer");
// const { HttpError, ctrlWrapper } = require("../helpers");

// const getDashboardStats = async (req, res, next) => {
//   const recentCustomers = await Customer.find().limit(5).sort({createdAt: -1})

//   const overallStat = await OverallStat.find();
//   const {
//     totalCustomers,
//     totalProducts,
//     // totalSuppliers,
//   } = overallStat[0]

//   res.status(200).json({
//     totalCustomers,
//     totalProducts,
//     customers
//   });
// };




// module.exports = {
//   getAll: ctrlWrapper(getDashboardStats),
// };
