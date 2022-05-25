import jwt from "jsonwebtoken";
import { RequestHandler, Request } from "express";
import { User } from "../models/user";

export type RequestType = {
  [prop: string]: any;
} & Request;

interface JwtPayload {
  id: string;
}
export const authUser: RequestHandler = async (req: RequestType, res, next) => {
  const SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw Error("Authorization header not found");

  try {
    const token: string = authHeader && authHeader.split(" ")[1];
    if (token === null || token === undefined) res.sendStatus(401);

    let payload;
    if (SECRET) payload = jwt.verify(token, SECRET) as JwtPayload;
    if (payload) req.user = await User.findById(payload.id);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401).json("Not authorized");
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
