import { promises as fs } from "fs";

class GestorProductos {
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    async obtenerTodosLosProductos(limite) {
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const productos = JSON.parse(data);

            if (limite) {
                return productos.slice(0, limite);
            }

            return productos;
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductoPorId(idProducto) {
        try {
            const data = await fs.readFile(this.rutaArchivo, "utf-8");
            const productos = JSON.parse(data);
            const producto = productos.find((p) => p.id === idProducto);

            if (!producto) {
                throw new Error("Producto no encontrado");
            }

            return producto;
        } catch (error) {
            throw error;
        }
    }
}

export default GestorProductos;
