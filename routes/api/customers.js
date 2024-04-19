const express = require("express");

const ctrl = require("../../controllers/customers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/customer");

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getAll);
router.get("/:customerId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);
router.put(
  "/:customerId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.delete("/:customerId", isValidId, ctrl.deleteById);

module.exports = router;
