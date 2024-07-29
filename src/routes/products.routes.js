import { Router } from "express";
import {
  getProducts,
  getProduct,
  editProduct,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post("/products", createProduct);

router.put("/products/:id", editProduct);

router.delete("/products/:id", deleteProduct);

export default router;
