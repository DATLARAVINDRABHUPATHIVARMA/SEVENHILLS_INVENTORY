import express from "express";
import { addCategory, getCategories, updateCategory, deleteCategory } from "../Controllers/CategoryController.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/add", AuthMiddleware, addCategory)
router.get("/", AuthMiddleware, getCategories)
router.put("/:id", AuthMiddleware, updateCategory )
router.delete("/:id", AuthMiddleware, deleteCategory )

export default router;