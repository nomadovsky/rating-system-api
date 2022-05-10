import { RequestHandler } from "express";

import { Product } from "../models/product";

export const createProduct: RequestHandler = async (req, res, next) => {
  const { productName, description, price } = req.body;

  const createdProduct = new Product({
    productName,
    description,
    price,
    rating: 0.0,
    reviews: [],
  });

  try {
    await createdProduct.save();
  } catch (error) {
    console.log(error);
    return next(error);
  }
  res.status(201).json({ product: createdProduct });
};
