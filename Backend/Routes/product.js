import express from "express";
import { getProducts } from "../Controllers/ProductController.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

const router = express.Router();

// router.post('/add', AuthMiddleware, addProduct)
router.get('/', AuthMiddleware, getProducts)
// router.put('/:id', AuthMiddleware, updateVendor)
// router.delete('/:id', AuthMiddleware, deleteVendor )
 
export default router;