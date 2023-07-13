const express = require("express");

const ctrl = require("../../controllers/auth");

const { authenticate } = require("../../middlewares/authenticate");

const validateBody = require("../../middlewares/validateBody");

const upload = require("../../middlewares/upload");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/user",
  authenticate,
  validateBody(schemas.updateUserSchema, "missing field subscription"),
  ctrl.updateUserSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
