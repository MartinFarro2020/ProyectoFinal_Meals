import { Router } from 'express';
import { router as userRouter } from '../modules/users/users.routes.js';
import { router as restaurantRoute } from '../modules/restaurants/restaurant.route.js';
import { router as mealRoute } from '../modules/meals/meals.route.js'
import { protect } from '../modules/users/auth.middleware.js';

export const router = Router();

router.use('/users', userRouter)
router.use(protect)
router.use('/restaurants', restaurantRoute);
router.use('/meals', mealRoute)
