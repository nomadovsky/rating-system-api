import { Review } from "./review";
import { Schema, model } from "mongoose";
interface IProduct {
  productName: string;
  description: string;
  price: number;
  rating: number;
  reviews: Review[];
}

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: { type: [], required: true },
});

export const Product = model<IProduct>("Product", productSchema);
