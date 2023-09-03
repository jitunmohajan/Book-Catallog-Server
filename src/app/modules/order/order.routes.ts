import express from 'express';
import { OrderController } from './order.controller';


const router = express.Router();

router.post('/create-order',OrderController.insertIntoDB)
router.get('/', OrderController.getAllFromDB)
router.get('/:orderId ', OrderController.getByIdFromDB)


export const orderRoutes = router;