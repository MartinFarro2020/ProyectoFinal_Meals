import express from 'express';
import { validExistOrder } from './orders.middleware.js'
import { validExistReview } from '../review/review.middleware.js'
import { protectAccountOwner } from '../users/auth.middleware.js'

export const router = express.Router()

import {
    findAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,    
} from './orders.controller.js';

router
    .route('/')
    .get(findAllOrders)
    .post(createOrder);

router
    .route('/:id')
    .patch(updateOrder)
    .delete(deleteOrder)
