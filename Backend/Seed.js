import bcrypt from 'bcrypt';
import User from "./Models/User.js";
import ConnectDB from "./DB/Connection.js";

const Register = async () => {
  ConnectDB()
  try {
    const hashPassword = await bcrypt.hash("sevenhills", 10)
    const newUser = new User({
      name: "Admin",
      email: "admin_sevenhills",
      password: hashPassword,
      address: "Seven Hills Facility Services Pvt. Ltd., 1st Floor, Plot No. 33, HACP Colony, Behind SBI, Karkana, Secunderabad, Telangana - 500009",
      role: "admin"
    })
    await newUser.save()
    console.log("Admin user created successfully");
  } catch (error) {
    console.log(error)
  }
}

Register();