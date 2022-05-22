import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { IReview } from "./review";
import { IProduct } from "./product";
export interface IUser {
  name?: string;
  mail: string;
  password: string;
  reviews?: IReview[];
  products?: IProduct[];
  isAdmin: boolean;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: false },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reviews: [
      { type: mongoose.Types.ObjectId, required: false, ref: "Review" },
    ],
    products: [
      { type: mongoose.Types.ObjectId, required: false, ref: "Product" },
    ],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);
