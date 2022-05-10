import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import productRoutes from "./routes/product";

const app = express();
app.use(express.json());

app.use("/product", productRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6kqow.mongodb.net/productsRatingSystem?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`run`);
    app.listen(3000);
  })
  .catch((err) => console.log(err));