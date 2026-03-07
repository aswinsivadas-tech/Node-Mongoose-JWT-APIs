import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/", protect, addProduct);
router.get("/", protect, getProducts);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
