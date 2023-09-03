import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-category', auth(ENUM_USER_ROLE.ADMIN), validateRequest(CategoryValidation.create),CategoryController.insertIntoDB)
router.get('/', CategoryController.getAllFromDB)
router.get('/:id', CategoryController.getByIdFromDB)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), validateRequest(CategoryValidation.update),CategoryController.updateOneInDB)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteByIdFromDB)



export const categoryRoutes = router;