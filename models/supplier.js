const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for supplier"],
    },
    address: {
      type: String,
    },
    suppliers: {
      type: String,
    },
    date: {
      type: String,
    },
    amount: {
      type: String,
    },
    status: {
      type: String,
    },

    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // }
  },
  { versionKey: false, timestamps: true }
);

supplierSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string(),
  suppliers: Joi.string(),
  date: Joi.string(),
  amount: Joi.string(),
  status: Joi.string(),
});


const schemas = {
  addSchema,
};

const Supplier = model("supplier", supplierSchema);

module.exports = {
  Supplier,
  schemas,
};
