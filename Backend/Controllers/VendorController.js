import mongoose from "mongoose";
import Vendor from "../Models/Vendor.js";

const addVendor = async (req, res) => {
  try {
    const { vendorID, vendorName, vendorEmail, vendorPhone, vendorAddress, vendorDescription } = req.body;

    const existingVendor = await Vendor.findOne({ vendorName });
    if (existingVendor) {
      return res.status(400).json({ success: false, message: "Vendor already exists" });
    }

    const newVendor = new Vendor({ vendorID, vendorName, vendorEmail, vendorPhone, vendorAddress, vendorDescription });
    await newVendor.save();
    return res.status(201).json({ success: true, message: "Vendor added successfully" });
  } catch (error) {
    console.error('Error in adding vendor:', error)
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    return res.status(200).json({ success: true, vendors });
  } catch (error) {
    console.error('Error in getting vendors:', error);
    return res.status(500).json({ success: false, message: "Server error in getting Vendors" });
  }
}

const updateVendor = async (req, res) => {
  try {
    const {id} = req.params;
    const { vendorID, vendorName, vendorEmail, vendorPhone, vendorAddress, vendorDescription } = req.body;

    const existingVendor = await Vendor.findById(id);
    if (!existingVendor) { 
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    const updatedVendor = await Vendor.findByIdAndUpdate(id, { vendorID, vendorName, vendorEmail, vendorPhone, vendorAddress, vendorDescription }, { new: true });
    return res.status(200).json({ success: true, message: "Vendor updated successfully" });

  } catch (error) {
    console.error('Error in updating vendor:', error);
    return res.status(500).json({ success: false, message: "Server error in updating Vendor" });
  }
}

const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const existingVendor = await Vendor.findById(id);
    if (!existingVendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    await Vendor.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Vendor deleted successfully" });

  } catch (error) {
    console.error('Error in deleting vendor:', error);
    return res.status(500).json({ success: false, message: "Server error in deleting Vendor" });
  }
}


export { addVendor, getVendors, updateVendor, deleteVendor }