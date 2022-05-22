import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const createUser: RequestHandler = async (req, res, next) => {
  const { name, mail, password } = req.body;

  const userExists = await User.findOne({ mail });

  if (userExists) {
    res.status(409).json("User already exists");
  }

  const createdUser = new User({
    name: name ? name : mail,
    mail,
    password,
    reviews: [],
    products: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    res.status(400).json("Cannot create user");
  }
  res.status(201).json({ user: createdUser });
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { mail, password } = req.body;

  const user = await User.findOne({ mail });

  if (user && (await user.comparePassword(password)))
    res.json({
      _id: user._id,
      name: user.name,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "15d",
      }),
    });
  else {
    res.status(401).json("Incorrect mail or password");
  }
};
