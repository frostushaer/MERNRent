import express from "express";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getSingleProduct, getlatestProducts, newProduct, updateProduct } from "../controlllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new",adminOnly ,singleUpload, newProduct);

app.get("/all", getAllProducts);

app.get("/latest", getlatestProducts);

app.get("/categories", getAllCategories);

app.get("/admin-products",adminOnly, getAdminProducts);

app.route("/:id").get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteProduct);

export default app;