import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default getById;
