import express from "express";
import { addCategory } from "../Controllers/CategoryController.js";

const router = express.Router();

router.post("/add", addCategory)

export default router;