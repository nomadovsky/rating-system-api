import { Router } from "express";
import { createProduct } from "../controllers/products";

const router = Router();

router.post("/add", createProduct);

export default router;
