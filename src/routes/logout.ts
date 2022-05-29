import { Router } from "express";
import { logout } from "../controllers/users";
import { authUser } from "../controllers/auth";

const router = Router();

router.get("/", authUser, logout);

export default router;
