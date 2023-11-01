import express from 'express';
import { validExistRestaurant } from '../restaurants/restaurant.middleware.js'
import { validExistMeal } from '../meals/meals.middleware.js'
import { protectAccountOwner } from '../users/auth.middleware.js'

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
    .post(validExistRestaurant,createMealToRestaurant)
    .get(findOneMeal)
    .patch(validExistMeal,protectAccountOwner,updateMeal)
    .delete(validExistMeal,protectAccountOwner,deleteMeal)

