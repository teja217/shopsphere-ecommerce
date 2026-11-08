import { Router } from 'express';
import { cartController } from '../controllers/cartController.js';
import { validateCartAdd, validateCartUpdate } from '../middleware/validator.js';

const router = Router();

router.get('/', cartController.getCart);
router.post('/', validateCartAdd, cartController.addToCart);
router.put('/:id', validateCartUpdate, cartController.updateCartItem);
router.delete('/:id', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

export default router;
