import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', validateRequest(CategoryValidation.create),CategoryController.insertIntoDB)
router.get('/', CategoryController.getAllFromDB)
router.get('/:id', CategoryController.getByIdFromDB)
router.patch('/:id', validateRequest(CategoryValidation.update),CategoryController.updateOneInDB)
// router.delete('/:id', CategoryController.deleteByIdFromDB)



export const categoryRoutes = router;