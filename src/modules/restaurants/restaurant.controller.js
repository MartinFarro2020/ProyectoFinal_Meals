import { catchAsync } from "../../errors/index.js"
import { RestaurantService} from "./restaurant.service.js"
import { ReviewService } from "../review/review.service.js"
import Restaurant from "./restaurant.model.js"
import { updateRestaurants } from "./restaurant.schema.js"

const restaurantService = new RestaurantService()

export const findAllRestaurants = catchAsync(async(req,res,next)=>{
    const restaurants = await restaurantService.findAllRestaurants()
    return res.status(200).json(restaurants)
})


export const createRestaurant = catchAsync(async(req,res,next)=>{
    const { name, address, rating } = req.body;

    const restaurant = await restaurantService.createRestaurant({ name, address, rating });

    return res.status(200).json(restaurant)
})


export const findOneRestaurant = catchAsync(async(req,res,next)=>{
    const { id } = req.params
    const restaurant = await restaurantService.findOneRestaurant(id)
    return res.status(200).json(restaurant)
})


export const updateRestaurant = catchAsync(async(req,res,next)=>{
    const { hasError, errorMessages, restaurantData } = updateRestaurants(req.body);

    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }
  
    const { id } = req.params;
  
    const restaurant = await restaurantService.findOneById(id);
  
    if (!restaurant) {
      return next(new AppError(`Can't find user with id: ${id}`, 404));
    }
  
    const updatedRestaurant = await restaurantService.updateRestaurant(restaurant, restaurantData);
  
    return res.status(200).json(updatedRestaurant);

});


export const deleteRestaurant = catchAsync(async(req,res,next)=>{
    const { hasError, errorMessages, restaurantData } = updateRestaurants(req.body);

    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }
  
    const { id } = req.params;
  
    const restaurant = await restaurantService.findOneById(id);
  
    if (!restaurant) {
      return next(new AppError(`Can't find user with id: ${id}`, 404));
    }
  
    const deleteRestaurant = await restaurantService.deleteRestaurant(restaurant, restaurantData);
  
    return res.status(200).json(deleteRestaurant);
})


export const createReviewToRestaurant = catchAsync(async(req,res,next)=>{
    const { comnent, rating } = req.body

    const { id } = req.params;

    const { sessionUser } = req;

    const review = await ReviewService.create({
         comnent,
         rating,
         restaurantId: id,
         userId: sessionUser.id
    })

    return res.status(201).json(review)
})


export const updateReview = catchAsync(async(req,res,next)=>{
    const { comnent, rating } = req.body;
    const { review } = req;

    const reviewUpdated = await ReviewService.updateReview(review, {comnent, rating})

    return res.status(200).json(reviewUpdated)

})


export const deleteReview = catchAsync(async(req,res,next)=>{

});