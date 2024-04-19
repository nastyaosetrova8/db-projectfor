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
});

const schemas = {
  addSchema,
};

const Customer = model("customer", customerSchema);

module.exports = {
  Customer,
  schemas,
};
