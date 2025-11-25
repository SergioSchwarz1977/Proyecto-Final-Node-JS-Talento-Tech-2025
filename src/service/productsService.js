import { getAllProducts, getProductById, createProducts, updateProducts, deleteProducts } from "../models/productsModels.js";

export const getAllProductsService = async () => {
    return (
        new Promise(async (res, rej) => {
            try {
                const products = await getAllProducts()
                res(products)
            } catch (error) {
                rej(error)
            }
        }
        ))
};

export const getProductByIdService = async (id) => {
    return (
        new Promise(async (res, rej) => {
            try {
                const product = await getProductById(id)
                res(product)
            } catch (error) {
                rej(error)
            }
        })
    );
};

export const createProductService = async (productData) => {
    return(
        new Promise(async (res, rej) => {
            try {
                const newProduct = await createProducts(productData);
                res({ message: "Producto creado exitosamente" , product: newProduct });
            } catch (error) {
                rej(error);
            }           
        }   
    )   
)};

export const updateProductService = async (id, producto) => {
    return (
        new Promise(async (res, rej) => {
            try {
                const result = await updateProducts(id, producto);
                res(result);
            } catch (error) {
                rej(error);
            }
        })
    );
};

export const deleteProductService = async (id) => {
    return(
        new Promise(async(res,rej)=>{
            try {
                const result = await deleteProducts(id)
                res(result)
            } catch (error) {
                rej(error)
            }
        })
    );  
};