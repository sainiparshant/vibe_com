import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors';
import connectDb from "./db/connectDb.js";
import { seedProducts } from "./controllers/product.controller.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js"


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(PORT, () => {
    connectDb();
    // seedProducts();
    console.log(`Server is running on port ${PORT}`);
});