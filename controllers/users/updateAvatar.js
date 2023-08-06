import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";

const avatarPath = path.resolve("public", "avatars");
console.log(avatarPath);

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Avatar file not found");
  }

  const { path: oldPath, originalname } = req.file;

  const avatar = await Jimp.read(oldPath);
  avatar.resize(250, 250).writeAsync(oldPath);

  const filename = `${_id}_${originalname}`;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(201).json({ avatarURL });
};

export default updateAvatar;
