import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', UserController.getAllFromDB)
router.get('/:id', UserController.getByIdFromDB)
router.patch('/:id', validateRequest(UserValidation.update),UserController.updateOneInDB);

router.delete('/:id',UserController.deleteByIdFromDB);


export const userRoutes = router;