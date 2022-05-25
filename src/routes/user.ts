import { Router } from "express";
import {
  buyProduct,
  getUserProducts,
  getUserReviews,
} from "../controllers/users";
import { authUser, authAdmin } from "../controllers/auth";

const router = Router();

router.post("/buy/:productID", authUser, buyProduct);
router.get("/:userId/my_products", authUser || authAdmin, getUserProducts);
router.get("/:userId/my_reviews", authUser || authAdmin, getUserReviews);

export default router;
