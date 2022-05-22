import { Router } from "express";
import { loginUser } from "../controllers/users";

const router = Router();

router.post("/", loginUser);

export default router;
