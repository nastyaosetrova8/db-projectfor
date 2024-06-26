const express = require("express");

const ctrl = require("../../controllers/products");
const {
  validateBody,
  isValidIdProduct,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/product");

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getAll);
router.get("/:productId", isValidIdProduct, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);
router.patch(
  "/:productId",
  isValidIdProduct,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.delete("/:productId", isValidIdProduct, ctrl.deleteById);

module.exports = router;
