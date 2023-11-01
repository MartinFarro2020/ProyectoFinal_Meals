import { catchAsync } from "../../errors/index.js"
import { MealService } from "./meals.service.js"
import { RestaurantService} from "../restaurants/restaurant.service.js"
import { updateMeals } from "./meals.schema.js"

const mealService = new MealService()

export const findAllMeals = catchAsync(async(req,res,next) => {
    const meals = await mealService.findAllMeals()
    return res.status(200).json(meals)

})


export const createMealToRestaurant = catchAsync(async(req,res,next)=>{
    const { name, price } = req.body

    const { id } = req.params;

    const meal = await mealService.createMeal({
         name,
         price,
         restaurantId: id,
    })

    return res.status(201).json(meal)
})


export const findOneMeal = catchAsync(async(req,res,next) => {
    const { id } = req.params
    const meal = await mealService.findOneById(id)
    return res.status(200).json(meal)


})
export const updateMeal = catchAsync(async(req,res,next) => {
    const { hasError, errorMessages, mealData } = updateMeals(req.body);

    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }
  
    const { id } = req.params;
  
    const meal = await mealService.findOneById(id);
  
    if (!meal) {
      return next(new AppError(`Can't find user with id: ${id}`, 404));
    }
  
    const updatedMeal = await mealService.updateMeal(meal, mealData);
  
    return res.status(200).json(updatedMeal);



})
export const deleteMeal = catchAsync(async(req,res,next) => {
    const { hasError, errorMessages, mealData } = updateMeals(req.body);

    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }
  
    const { id } = req.params;
  
    const meal = await mealService.findOneById(id);
  
    if (!meal) {
      return next(new AppError(`Can't find user with id: ${id}`, 404));
    }
  
    const deleteMeal = await mealService.deleteMeal(meal, mealData);
  
    return res.status(200).json(deleteMeal);

})