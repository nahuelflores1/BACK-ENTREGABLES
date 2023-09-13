import express from "express";
import fs from "fs/promises";

const router = express.Router();

router.post("/", async (req, res) => {
    const newCart = req.body;
    try {
        newCart.id = generateUniqueId();

        const data = await fs.readFile("carrito.json", "utf-8");
        const carts = JSON.parse(data);

        carts.push(newCart);
        await fs.writeFile("carrito.json", JSON.stringify(carts, null, 2));
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    try {
        const data = await fs.readFile("carrito.json", "utf-8");
        const carts = JSON.parse(data);
        const cart = carts.find((c) => c.id === cartId);
        if (!cart) {
            res.status(404).json({ error: "Carrito no encontrado" });
        } else {
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    try {
        const data = await fs.readFile("carrito.json", "utf-8");
        let carts = JSON.parse(data);
        const cartIndex = carts.findIndex((c) => c.id === cartId);
        if (cartIndex === -1) {
            res.status(404).json({ error: "Carrito no encontrado" });
        } else {
            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex(
                (p) => p.product === productId
            );
            if (productIndex === -1) {
                cart.products.push({ product: productId, quantity });
            } else {
                cart.products[productIndex].quantity += quantity;
            }
            await fs.writeFile("carrito.json", JSON.stringify(carts, null, 2));
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({
            error: "Error al agregar el producto al carrito",
        });
    }
});

function generateUniqueId() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

export default router;
