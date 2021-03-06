import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Review } from "../models/review";
import { Token } from "../models/token";

import { RequestType } from "./auth";
import { equal } from "assert";

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

  if (user && (await user.comparePassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "2h",
    });
    await Token.findOneAndUpdate(
      { user: user._id },
      { token: token },
      { new: true, upsert: true }
    );
    res.json({
      _id: user._id,
      name: user.name,
      token,
    });
  } else {
    res.status(401).json("Incorrect mail or password");
  }
};

export const logout: RequestHandler = async (req: RequestType, res, next) => {
  try {
    await Token.findOneAndDelete({ user: req.user });
    res.status(200).json("User logged out");
  } catch (error) {
    res.status(401).json("Logout failed");
  }
};

export const buyProduct: RequestHandler = async (
  req: RequestType,
  res,
  next
) => {
  const productId = req.params.productID;

  const product = await Product.findById(productId);
  if (product) {
    req.user.products.push(product);
    req.user.save();
    res.status(200).json("Product has bought");
  } else res.status(404).json("Product not found");
};

export const getUserProducts: RequestHandler = async (
  req: RequestType,
  res,
  next
) => {
  if (req.user._id.toString() !== req.params.userId && !req.user.isAdmin)
    return res.status(403).json("You are not allowed to see products");
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404);
  const products = await Product.find({ _id: user.products });
  if (products.length !== 0) {
    return res.status(200).json(products);
  } else return res.status(404).json("Products not found");
};

export const getUserReviews: RequestHandler = async (
  req: RequestType,
  res,
  next
) => {
  if (req.user._id.toString() !== req.params.userId && !req.user.isAdmin)
    return res.status(403).json("You are not allowed to see reviews");
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404);
  const reviews = await Review.find({ user: user._id });
  console.log(reviews);
  if (reviews.length !== 0) {
    res.status(200).json(reviews);
  } else res.status(404).json("Reviews not found");
};
