// const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const { handleMongooseError } = require("../helpers");

// const overallStatSchema = new Schema(
//   {
//     totalCustomers: {
//       type: Number,
//     },
//     totalProducts: {
//       type: Number,
//     },
//     // totalSuppliers: {
//     //   type: Number,
//     // },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     }
//   },
//   { versionKey: false, timestamps: true }
// );

// overallStatSchema.post("save", handleMongooseError);

// const addSchema = Joi.object({
//   id: Joi.string(),
//   photo: Joi.string(),
//   name: Joi.string().required(),
//   suppliers: Joi.string(),
//   stock: Joi.string(),
//   price: Joi.string(),
//   category: Joi.string(),
// });

// const schemas = {
//   addSchema,
// };

// const OverallStat = model("overallStat", overallStatSchema);

// module.exports = {
//   OverallStat,
//   schemas,
// };
