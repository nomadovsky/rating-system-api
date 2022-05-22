import mongoose, { Schema, model } from "mongoose";

import { IUser } from "./user";
import { IProduct } from "./product";

export interface IReview {
  user: IUser;
  product: IProduct;
  rating: number;
  review?: string;
}

const reviewSchema = new Schema<IReview>({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  product: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
  rating: { type: Number, required: true },
  review: { type: String, required: false },
});

export const Review = model<IReview>("Review", reviewSchema);
