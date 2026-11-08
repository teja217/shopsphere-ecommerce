import { Router } from 'express';
import { productController } from '../controllers/productController.js';

const router = Router();

// Specific routes before param routes
router.get('/search', productController.searchProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

export default router;
