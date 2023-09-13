import express from "express";
import fs from "fs/promises";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await fs.readFile("products.json", "utf-8");
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

router.get("/:pid", async (req, res) => {
    const productId = req.params.pid;
    try {
        const data = await fs.readFile("products.json", "utf-8");
        const products = JSON.parse(data);
        const product = products.find((p) => p.id === productId);
        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        const data = await fs.readFile("products.json", "utf-8");
        const products = JSON.parse(data);

        if (
            !newProduct.title ||
            !newProduct.description ||
            !newProduct.code ||
            isNaN(newProduct.price) ||
            isNaN(newProduct.stock) ||
            !newProduct.category
        ) {
            return res.status(400).json({
                error: "Todos los campos obligatorios deben completarse",
            });
        }

        newProduct.id = generateUniqueId();

        products.push(newProduct);
        await fs.writeFile("products.json", JSON.stringify(products, null, 2));
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});

router.put("/:pid", async (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    try {
        const data = await fs.readFile("products.json", "utf-8");
        let products = JSON.parse(data);
        const index = products.findIndex((p) => p.id === productId);
        if (index === -1) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            updatedProduct.id = productId;
            products[index] = updatedProduct;
            await fs.writeFile(
                "products.json",
                JSON.stringify(products, null, 2)
            );
            res.json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

router.delete("/:pid", async (req, res) => {
    const productId = req.params.pid;
    try {
        const data = await fs.readFile("products.json", "utf-8");
        let products = JSON.parse(data);
        products = products.filter((p) => p.id !== productId);
        await fs.writeFile("products.json", JSON.stringify(products, null, 2));
        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});

function generateUniqueId() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

export default router;
