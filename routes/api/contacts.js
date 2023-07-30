import express from "express";

import ctrl from "../../controllers/contacts/index.js";
import {validateBody} from "../../decorators/index.js";
import {isValidId, authenticate} from "../../middlewares/index.js";
import shemas from "../../schemas/contacts.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrl.listContacts);

contactsRouter.get("/:id", isValidId, ctrl.getById);

contactsRouter.post("/", validateBody(shemas.addSchema), ctrl.addContact);

contactsRouter.delete("/:id", isValidId, ctrl.removeContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(shemas.addSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(shemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

export default contactsRouter;
