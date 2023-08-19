import "dotenv/config";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import { User } from "../../models/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
  };

  // await sendEmail(verifyEmail);

  await sendEmail(verifyEmail)
    .then(() => {
      console.log("Verification email sent successfully");
    })
    .catch((error) => {
      console.log("Error sending verification email:", error.message);
    });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default register;
