import express from 'express';
import { deleteUser, login, register, updateUser } from './users.controller.js';

export const router = express.Router();

router.post('/login', login)
router.post('/register', register)

router
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)




