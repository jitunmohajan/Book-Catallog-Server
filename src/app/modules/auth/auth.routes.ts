import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post('/signup', validateRequest(AuthValidation.create),AuthController.createUser)
router.post('/signin', AuthController.signin)


export const authRoutes = router;