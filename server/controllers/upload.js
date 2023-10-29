import User from "../models/User.js";
import { uploadErrors } from "../utils/error.js";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";


export const uploadProfil = async (req, res, next) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) { 
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      { $set: { img: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
