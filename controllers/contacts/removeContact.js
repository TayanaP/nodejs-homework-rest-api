import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

export default removeContact;
