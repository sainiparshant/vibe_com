import { addToCart, checkout, getCartItems, removeItem } from "../controllers/cart.controller.js";
import { Router } from "express";

const router = Router();

router.post("/cart", addToCart);
router.delete("/cart/:id", removeItem);
router.get("/cart", getCartItems);
router.post("/checkout", checkout);


export default router;