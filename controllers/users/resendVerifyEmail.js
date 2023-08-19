import "dotenv/config";

import { HttpError, sendEmail } from "../../helpers/index.js";
import { User } from "../../models/index.js";

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  console.log("Verification Token:", user.verificationToken);

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

export default resendVerifyEmail;
