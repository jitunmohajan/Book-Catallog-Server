import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();

router.post('/create-book', auth(ENUM_USER_ROLE.ADMIN), validateRequest(BookValidation.create),BookController.insertIntoDB)
router.get('/', BookController.getAllFromDB)
router.get('/:categoryId/category', BookController.getCategoryBooksByIdFromDB)
router.get('/:id', BookController.getByIdFromDB)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), validateRequest(BookValidation.update),BookController.updateOneInDB)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteByIdFromDB)



export const bookRoutes = router;