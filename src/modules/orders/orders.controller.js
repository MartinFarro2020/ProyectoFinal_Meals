import { catchAsync } from "../../errors/index.js"
import { OrderService} from "./orders.service.js"
import { MealService } from "../meals/meals.service.js"
import { updateOrders } from "./orders.schema.js"

const orderService = new OrderService()
const mealService = new MealService()


export const findAllOrders = catchAsync(async(req,res,next)=>{
    const { sessionUser } = req;

    const order = await orderService.findAllOrders(sessionUser.id)
    return res.status(200).json(order)

})
export const createOrder = catchAsync(async(req,res,next)=>{
    const { mealId, quantity } = req.body

    const meal = await mealService.findOneById(mealId)
    console.log(meal);
    const total = meal.price*quantity;

    const { sessionUser } = req;

    const order = await orderService.createOrder({
         mealId,
         userId: sessionUser.id,
         totalPrice: total,
         quantity,
    })

    return res.status(201).json(order)

})
export const updateOrder = catchAsync(async(req,res,next)=>{
      
    const { id } = req.params;
  
    const order = await orderService.findOneById(id);
  
    if (!order) {
      return next(new AppError(`Can't find order with id: ${id}`, 404));
    }
  
    const updatedOrder = await orderService.updateOrder(order);
  
    return res.status(200).json(updatedOrder);

})

export const deleteOrder = catchAsync(async(req,res,next)=>{

    const { id } = req.params;
  
    const order = await orderService.findOneById(id);

    if (!order) {
      return next(new AppError(`Can't find order with id: ${id}`, 404));
    }
  
    const deleteOrder = await orderService.deleteOrder(order);
  
    return res.status(200).json(deleteOrder);

})
