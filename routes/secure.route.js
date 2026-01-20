import { Router } from 'express';
import { secureController } from '../controllers/secure.controller.js';
import { checkServiceToken } from '../middlewares/serviceSecure.middleware.js';

const router = Router();

router.post('/register', secureController.register);
router.post('/login', secureController.login);

router.get('/verify', checkServiceToken, secureController.verify);

export default router;