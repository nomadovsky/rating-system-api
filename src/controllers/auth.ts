import jwt from "jsonwebtoken";
import { RequestHandler, Request } from "express";
import { User } from "../models/user";
import { Token } from "../models/token";

export type RequestType = {
  [prop: string]: any;
} & Request;

interface JwtPayload {
  id: string;
}
export const authUser: RequestHandler = async (req: RequestType, res, next) => {
  const SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).json("Authorization header not found");

  try {
    const token: string = authHeader && authHeader.split(" ")[1];
    if (token === null || token === undefined)
      return res.sendStatus(401).json("Not authorized");
    let payload;
    if (SECRET) payload = jwt.verify(token, SECRET) as JwtPayload;
    if (!payload) return res.sendStatus(401).json("Not authorized");
    const userToken = await Token.findOne({ user: payload.id });
    if (!userToken) return res.sendStatus(401).json("Not authorized");
    req.user = await User.findById(payload.id);
    next();
  } catch (error) {
    return res.sendStatus(401).json("Not authorized");
  }
};

export const authAdmin: RequestHandler = async (
  req: RequestType,
  res,
  next
) => {
  if (req.user.isAdmin) next();
  else res.status(403).json("You don't have access");
};
