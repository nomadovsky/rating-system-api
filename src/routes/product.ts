import { Router } from "express";
import { createProduct } from "../controllers/products";

const router = Router();

router.post("/add", createProduct);
// router.get("/:productId", getProduct);
// router.get("/all", getAllProducts);
// router.delete("/:productId", deleteProduct);
// router.put("/:productId", editProduct);

// router.post("/:productId/addReview", createReview);
// router.get("/:productId/reviews", getAllReviews);
// router.get("/:productId/review/:reviewId", getReview);
// router.delete("/:productId/review/:reviewId", deleteReview);
// router.put("/:productId/review/:reviewId", changeReview);

export default router;
