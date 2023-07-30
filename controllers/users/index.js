import { ctrlWrapper } from "../../decorators/index.js";

import register from "../../controllers/users/register.js";
import login from "../../controllers/users/login.js";
import getCurrent from "../../controllers/users/getCurrent.js";
import logout from "../../controllers/users/logout.js";

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
