import { Router } from "express";
import {
  createProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
  createReview,
  getAllReviews,
  getReview,
  deleteReview,
  editReview,
  getLastFiveProducts,
  getLastFiveReviews,
  getRating,
} from "../controllers/products";
import { authAdmin, authUser } from "../controllers/auth";

const router = Router();

router.post("/add", authUser, authAdmin, createProduct);
router.get("/all", getAllProducts);
router.get("/:productId", getProduct);
router.get("/:productId/rating", getRating);
router.delete("/:productId", authUser, authAdmin, deleteProduct);
router.put("/:productId", authUser, authAdmin, editProduct);
router.get("/all/last-five", getLastFiveProducts);

router.post("/:productId/addReview", authUser, createReview);
router.get("/:productId/reviews", getAllReviews);
router.get("/reviews/last-five", getLastFiveReviews);

router.get("/:productId/review/:reviewId", getReview);
router.delete("/:productId/review/:reviewId", authUser, deleteReview);
router.put("/:productId/review/:reviewId", authUser, editReview);

export default router;
