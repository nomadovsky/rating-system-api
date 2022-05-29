import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./user";

export interface IToken {
  token: string;
  user: IUser;
}

const tokenSchema = new Schema<IToken>(
  {
    token: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Token = model<IToken>("Token", tokenSchema);
