import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';


const router = express.Router();

router.post('/create-book', validateRequest(BookValidation.create),BookController.insertIntoDB)
router.get('/', BookController.getAllFromDB)
router.get('/:id', BookController.getByIdFromDB)
router.patch('/:id', validateRequest(BookValidation.update),BookController.updateOneInDB)
// router.delete('/:id', BookController.deleteByIdFromDB)



export const bookRoutes = router;