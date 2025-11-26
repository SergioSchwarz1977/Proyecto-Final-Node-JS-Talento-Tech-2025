import express from 'express';
import { getAllProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from '../controllers/productsControllers.js';
import { authentication } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/products',getAllProductsController);
router.get('/products/:id', getProductByIdController);
router.post('/products/create', authentication,createProductController);
router.put('/products/:id', authentication,updateProductController);
router.delete('/products/:id', authentication,deleteProductController);


export default router;