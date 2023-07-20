import express from "express";
import ctrl from "../../controllers/contacts.js";
import validateBody from "../../decorators/validateBody.js";
import shemas from "../../schemas/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.listContacts);

contactsRouter.get("/:id", ctrl.getById);

contactsRouter.post("/", validateBody(shemas.addSchema), ctrl.addContact);

contactsRouter.delete("/:id", ctrl.removeContact);

contactsRouter.put("/:id", validateBody(shemas.addSchema), ctrl.updateContact);

export default contactsRouter;
