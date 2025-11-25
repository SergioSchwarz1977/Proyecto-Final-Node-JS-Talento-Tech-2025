import express from 'express';
import { getAllProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from '../controllers/productsControllers.js';

const router = express.Router();

router.get('/products', getAllProductsController);
router.get('/products/:id', getProductByIdController);
router.post('/products/create', createProductController);
router.put('/products/:id', updateProductController);
router.delete('/products/:id', deleteProductController);


export default router;