import express from 'express';
import { validExistRestaurant } from './restaurant.middleware.js'
import { validExistReview } from '../review/review.middleware.js'
import { protectAccountOwner } from '../users/auth.middleware.js'

export const router = express.Router()

import {
    findAllRestaurants,
    createRestaurant,
    findOneRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReviewToRestaurant,
    updateReview,
    deleteReview    
} from './restaurant.controller.js';

router
    .route('/')
    .get(findAllRestaurants)
    .post(createRestaurant);

router
    .route('/:id')
    .get(findOneRestaurant)
    .patch(updateRestaurant)
    .delete(deleteRestaurant)

router.post('/reviews/:id', validExistRestaurant ,createReviewToRestaurant);

router
    .route('/reviews/:restaurantId/:id')
    .patch(
        validExistRestaurant,
        validExistReview,
        protectAccountOwner,
        updateReview)
    .delete(
        validExistRestaurant,
        validExistReview,
        protectAccountOwner,
        deleteReview)
