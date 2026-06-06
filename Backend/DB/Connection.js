import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL,);
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection failed", error.message);
    process.exit(1);
  }
}

export default connectDB;