const express = require("express");

const ctrl = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
