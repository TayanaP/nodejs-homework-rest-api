import express from "express";

import { validateBody } from "../../decorators/index.js";
import userSchemas from "../../schemas/users.js";
import userCtrl from "../../controllers/users/index.js";
import { authenticate } from "../../middlewares/index.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  userCtrl.register
);

usersRouter.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  userCtrl.login
);

usersRouter.post("/logout", authenticate, userCtrl.logout);

usersRouter.get("/current", authenticate, userCtrl.getCurrent);

export default usersRouter;
