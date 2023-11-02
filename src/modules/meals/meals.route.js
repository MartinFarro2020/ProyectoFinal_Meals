import express from 'express';
import { validExistRestaurant } from '../restaurants/restaurant.middleware.js'
import { validExistMeal } from '../meals/meals.middleware.js'
import { restrictTo } from '../users/auth.middleware.js'

export const router = express.Router()

import {
    findAllMeals,
    createMealToRestaurant,
    findOneMeal,
    updateMeal,
    deleteMeal,    
} from './meals.controller.js';

router
    .route('/')
    .get(findAllMeals)
    
router
    .route('/:id')
    .post(restrictTo('admin'),validExistRestaurant,createMealToRestaurant)
    .get(findOneMeal)
    .patch(restrictTo('admin'),validExistMeal,updateMeal)
    .delete(restrictTo('admin'),validExistMeal,deleteMeal)

