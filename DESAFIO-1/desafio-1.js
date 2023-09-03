class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(productData) {
        const { code } = productData;

        if (this.products.some((product) => product.code === code)) {
            throw new Error("El código del producto ya está en uso");
        }

        const newProduct = {
            id: Date.now(),
            ...productData,
        };

        this.products.push(newProduct);
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find(
            (product) => product.id === productId
        );
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }
}

const productManager = new ProductManager();

const productData = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
};

try {
    const addedProduct = productManager.addProduct(productData);
    console.log("Producto agregado:", addedProduct);
} catch (error) {
    console.error("Error al agregar el producto:", error.message);
}

const productsList = productManager.getProducts();
console.log("Lista de productos:", productsList);

try {
    productManager.addProduct(productData);
} catch (error) {
    console.error("Error al agregar el producto:", error.message);
}

try {
    const productIdToFind = productsList[0].id;
    const foundProduct = productManager.getProductById(productIdToFind);
    console.log("Producto encontrado por ID:", foundProduct);
} catch (error) {
    console.error("Error al obtener el producto por ID:", error.message);
}
