import User from "../models/User.js";
import bcrypt from "bcrypt"; 
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    //6-2
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

//7-Setup message error
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));
    //res.status(200).json(user);
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      // openssl rand -base64 32 : generate random string dans le terminal
      // avant d'écrire le code ci-dessous, il faut créer un fichier .env dans le dossier server
      // Puis installer cookie-parser
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));
    //res.status(200).json(user);
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      // openssl rand -base64 32 : generate random string dans le terminal
      // avant d'écrire le code ci-dessous, il faut créer un fichier .env dans le dossier server
      // Puis installer cookie-parser
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).send("User has been logged out.");
  } catch (err) {
    next(err);
  }
}