import mongoose from 'mongoose'

const vendorSchema = new mongoose.Schema({
  vendorID: { type: String, required: true},
  vendorName: { type: String, required: true},
  vendorEmail: { type: String, required: true},
  vendorPhone: { type: String, required: true},
  vendorAddress: { type: String, required: true},
  vendorDescription: { type: String, required: true},
})

const Vendor = mongoose.model('Vendor', vendorSchema)
export default Vendor;