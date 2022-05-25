import { IReview } from "./review";
import mongoose, { Schema, model } from "mongoose";
export interface IProduct {
  productName: string;
  description: string;
  price: number;
  rating: string;
  reviews: IReview[];
}

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: String, required: true },
    reviews: [
      { type: mongoose.Types.ObjectId, required: false, ref: "Review" },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", productSchema);
