import express from "express";
import { addVendor, getVendors, updateVendor, deleteVendor } from "../Controllers/VendorController.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/add', AuthMiddleware, addVendor)
router.get('/', AuthMiddleware, getVendors)
router.put('/:id', AuthMiddleware, updateVendor)
router.delete('/:id', AuthMiddleware, deleteVendor )
 
export default router;