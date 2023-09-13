import express from "express";
import productsRouter from "./products/products.js";
import cartsRouter from "./carts/carts.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
    console.log(`el server esta corriendo en el puerto ${PORT}`);
});
