import { RequestHandler } from "express";

import { Product } from "../models/product";
import { Review } from "../models/review";
import { User } from "../models/user";
import { RequestType } from "./auth";

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
    return res.status(400).json("Product can't be added");
  }
  res.status(201).json({ product: createdProduct });
};

export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json("Product not found");
  }
};

export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json("Cannot list all products");
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    res.status(204).json("resource deleted successfully");
  } catch (error) {
    res.status(404).json("Product not found");
  }
};
export const editProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
    });
    res.status(200).json("Product modified successfully");
  } catch (error) {
    res.status(404).json("Product not found");
  }
};

export const createReview: RequestHandler = async (
  req: RequestType,
  res,
  next
) => {
  const { rating, reviewText } = req.body;
  const notRieviewed = "Not commented";
  const comment = reviewText ? reviewText : notRieviewed;

  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json("Product not found");

    const isBought = req.user.products.some(
      (prod: any) => prod.toString() === req.params.productId.toString()
    );

    if (!isBought)
      return res.status(400).json("You cannot review this product");

    const isReviewed = product.reviews.find((review) => {
      review.user.toString() === req.user._id.toString();
    });
    if (isReviewed) {
      res.status(400).json("You already reviewed this product");
    }

    const createdReview = new Review({
      user: req.user,
      product,
      userName: req.user.name,
      rating,
      review: comment,
    });

    await createdReview.save();

    const review = await Review.findById(createdReview._id);

    if (review) {
      product.reviews.push(review);
      req.user.reviews.push(review);

      const allReviews = await Review.find({ product: req.params.productId });
      const reviewsSum = allReviews.reduce(
        (prevRev, rev) => prevRev + Number(rev.rating),
        0
      );
      const allReviewsNumber = product.reviews.length;
      console.log(`reviews sum: ${reviewsSum}`);
      console.log(`reviews number: ${allReviewsNumber}`);
      product.rating = (reviewsSum / allReviewsNumber).toFixed(1);
      await product.save();
      await req.user.save();
      res.status(200).json(createdReview);
    } else res.status(400).json("Review not created");
  } catch (error) {
    console.log(error);
    return res.status(404).json("Product not found");
  }
  // res.status(201).json({ product: createdProduct });
};

export const getAllReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId });
    if (!reviews) res.status(404).json("Product has no reviews");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json("Cannot find product");
  }
};

export const getReview: RequestHandler = async (req, res, next) => {
  const review = await Review.find({
    product: req.params.productId,
    _id: req.params.reviewId,
  });
  if (!review) res.status(404).json("Review doesn't exist");
  res.status(200).json(review);
};
export const deleteReview: RequestHandler = async (req, res, next) => {
  const review = await Review.findOneAndDelete({
    product: req.params.productId,
    _id: req.params.reviewId,
  });
  if (!review) res.status(404).json("Review doesn't exist");
  res.status(200).json("Deleted");
};

export const editReview: RequestHandler = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.reviewId, {
      rating: req.body.rating,
      review: req.body.reviewText,
    });
    res.status(200).json("Review modified successfully");
  } catch (error) {
    res.status(404).json("Review not found");
  }
};

export const getLastFiveProducts: RequestHandler = async (req, res, next) => {
  try {
    const lastFiveProducts = await Product.find({})
      .limit(5)
      .sort({ createdAt: "desc" });
    res.status(200).json(lastFiveProducts);
  } catch (error) {
    res.status(500).json("Cannot list products");
  }
};
export const getLastFiveReviews: RequestHandler = async (req, res, next) => {
  try {
    const lastFiveReviews = await Review.find({})
      .limit(5)
      .sort({ createdAt: "desc" });
    res.status(200).json(lastFiveReviews);
  } catch (error) {
    res.status(500).json("Cannot list Reviews");
  }
};

export const getRating: RequestHandler = async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  const allReviews = await Review.find({ product: req.params.productId });
  const reviewsSum = allReviews.reduce(
    (prevRev, rev) => prevRev + Number(rev.rating),
    0
  );
  const allReviewsNumber = product.reviews.length;

  res.send(200).json{}
};

// getLastFiveProducts
