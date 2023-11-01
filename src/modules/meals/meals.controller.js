import { catchAsync } from "../../errors/index.js"
import { MealService } from "./meals.service.js"
import { RestaurantService} from "../restaurants/restaurant.service.js"
//import { updateMeals } from "./meals.schema.js"

const mealService = new MealService()

export const findAllMeals = catchAsync(async(req,res,next) => {


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



})
export const updateMeal = catchAsync(async(req,res,next) => {



})
export const deleteMeal = catchAsync(async(req,res,next) => {



})