const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const customerSchema = new Schema(
  {
    image: {
      type: String,
      // required: [true, "Set name for customer"],
    },
    name: {
      type: String,
      // required: [true, "Set name for customer"],
    },
    email: {
      type: String,
    },
    spent: {
      type: String,
    },
    // phone: {
    //   type: String,
    // },
    // favorite: {
    //   type: Boolean,
    //   default: false,
    // },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

customerSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  spent: Joi.string().required(),
  // phone: Joi.string().required(),
  // favorite: Joi.boolean(),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const schemas = {
  addSchema,
  // updateFavoriteSchema,
};

const Customer = model("customer", customerSchema);

module.exports = {
  Customer,
  schemas,
};
