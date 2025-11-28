import * as productsService from "../service/productsService.js";

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productsService.getAllProductsService()
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({message: "Error al obtener los productos" })
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: "ID del producto es requerido" })
        } else {
            const product = await productsService.getProductByIdService(id)
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(500).json({message: "No se encontró el producto" })
    }
};

export const createProductController = async (req, res) => {
    try {
        const productData = req.body;
        const result = await productsService.createProductService(productData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: "Error al crear el producto", error} );
    }
};

export const updateProductController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "ID del producto es requerido" });
        const producto = req.body;
        const result = await productsService.updateProductService(id, producto);
        res.status(200).json({ message: "Producto actualizado exitosamente", result });
    } catch (error) {
        res.status(500).json({message: "No se encontró el producto para actualizar" });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: "ID del producto es requerido" })
        } else {
            const result = await productsService.deleteProductsService(id);
            res.status(200).json({ message: "Producto eliminado exitosamente", result });
        }
    } catch (error) {
        if (error && error.status === 404) return res.status(404).json({ message: error.message });
        res.status(500).json(error);
    }

};