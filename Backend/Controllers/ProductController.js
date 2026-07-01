import mongoose from "mongoose";
import Vendor from "../Models/Vendor.js";
import CategoryModel from "../Models/Category.js";

const getProducts = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    const categories = await CategoryModel.find();
    return res.status(200).json({ success: true, vendors, categories });
  } catch (error) {
    console.error('Error in getting products:', error);
    return res.status(500).json({ success: false, message: "Server error in getting Products" });
  }
}

export { getProducts }