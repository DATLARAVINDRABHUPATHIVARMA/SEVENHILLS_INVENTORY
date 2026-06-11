import express from 'express';
import cors from 'cors';
import ConnectDB from './DB/Connection.js';
import authRouter from "./Routes/auth.js";
import CategoryRouter from './Routes/category.js';

const app = express();
app.use(cors());
app.use(express.json());
ConnectDB();
app.use("/api/auth", authRouter);
app.use("/api/category", CategoryRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});