import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllFromDB)
router.get('/:id', UserController.getByIdFromDB)

export const userRoutes = router;