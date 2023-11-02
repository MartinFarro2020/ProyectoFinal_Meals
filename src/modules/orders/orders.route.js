import express from 'express';

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
