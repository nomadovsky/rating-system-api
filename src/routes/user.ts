import { Router } from "express";
import {
  buyProduct,
  getUserProducts,
  getUserReviews,
} from "../controllers/users";
import { authUser } from "../controllers/auth";

const router = Router();

router.post("/buy/:productID", authUser, buyProduct);
router.get("/:userId/my_products", authUser, getUserProducts);
router.get("/:userId/my_reviews", authUser, getUserReviews);

export default router;
