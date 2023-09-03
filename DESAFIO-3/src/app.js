// app.js

import express from "express";
import ProductManager from "../product-manager.js";

const app = express();
const puerto = 8080;

const gestorProductos = new ProductManager("../products.json"); // Asegúrate de tener un archivo products.json con tus productos.

app.get("/products", async (req, res) => {
    const { limit } = req.query;

    try {
        const products = await gestorProductos.obtenerTodosLosProductos(
            Number(limit)
        );
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error Interno del Servidor" });
    }
});

app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await gestorProductos.obtenerProductoPorId(pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

app.listen(puerto, () => {
    console.log(`El servidor está funcionando en el puerto ${puerto}`);
});
