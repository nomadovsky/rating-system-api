import mongoose, { Schema, model } from "mongoose";
import { IReview } from "./review";
import { IProduct } from "./product";
export interface IUser {
  name?: string;
  mail: string;
  password: string;
  reviews?: IReview[];
  products?: IProduct[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: false },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  reviews: [{ type: mongoose.Types.ObjectId, required: false, ref: "Review" }],
  products: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Product" },
  ],
});

export const User = model<IUser>("User", userSchema);
