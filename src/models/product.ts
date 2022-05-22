import { IReview } from "./review";
import mongoose, { Schema, model } from "mongoose";
export interface IProduct {
  productName: string;
  description: string;
  price: number;
  rating: number;
  reviews: IReview[];
}

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: [{ type: mongoose.Types.ObjectId, required: false, ref: "Review" }],
});

export const Product = model<IProduct>("Product", productSchema);
