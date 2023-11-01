import { AppError, catchAsync } from "../../errors/index.js";
import { MealService } from "./meals.service.js";

const mealService = new MealService

export const validExistMeal = catchAsync(async(req,res,next) => {

    const { id, restaurantId } = req.params;

    const meal = await mealService.findOneMeal(id, restaurantId)

    if(!meal){
        return next(new AppError('Restaurant no found',404))
    }

    req.meal = meal;
    next()
})