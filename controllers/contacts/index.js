import { ctrlWrapper } from "../../decorators/index.js";

import listContacts from "../../controllers/contacts/listContacts.js";
import getById from "../../controllers/contacts/getById.js";
import addContact from "../../controllers/contacts/addContact.js";
import removeContact from "../../controllers/contacts/removeContact.js";
import updateContact from "../../controllers/contacts/updateContact.js";
import updateStatusContact from "../../controllers/contacts/updateStatusContact.js";

export default {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
