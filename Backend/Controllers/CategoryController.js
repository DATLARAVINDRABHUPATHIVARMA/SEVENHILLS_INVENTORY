import CategoryModel from "../Models/Category.js";
import mongoose from 'mongoose'

const addCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;

    const existingCategory = await CategoryModel.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    const newCategory = new CategoryModel({ categoryName, categoryDescription, });
    await newCategory.save();
    return res.status(201).json({ success: true, message: "Category added successfully" });
  } catch (error) {
    console.error('Error in adding category:', error)
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error('Error in getting categories:', error);
    return res.status(500).json({ success: false, message: "Server error in getting Categories" });
  }
}

const updateCategory = async (req, res) => {
  try {
    
  } catch (error) {
  
  }
}



export { addCategory, getCategories, updateCategory }