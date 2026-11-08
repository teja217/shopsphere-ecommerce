import { Router } from 'express';
import { contactController } from '../controllers/contactController.js';
import { validateContact } from '../middleware/validator.js';

const router = Router();

router.post('/', validateContact, contactController.submitContact);
router.post('/checkout', contactController.processCheckout);

export default router;
