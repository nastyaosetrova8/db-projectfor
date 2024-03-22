const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const productSchema = new Schema(
  {
    id: {
      type: String,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Set name for product"],
    },
    suppliers: {
      type: String,
    },
    stock: {
      type: String,
    },
    price: {
      type: String,
    },
    category: {
      type: String,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  id: Joi.string(),
  photo: Joi.string(),
  name: Joi.string().required(),
  suppliers: Joi.string(),
  stock: Joi.string(),
  price: Joi.string(),
  category: Joi.string(),
});

const schemas = {
  addSchema,
};

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
};
