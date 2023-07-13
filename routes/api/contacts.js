const express = require("express");

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema, "missing required name field"),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema, "missing required name field"),
  ctrl.updateFavorite
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.updateContact
);

module.exports = router;
