import { AppError, catchAsync } from "../../errors/index.js";
import { OrderService } from "./orders.service.js";

const orderService = new OrderService

export const validExistOrder = catchAsync(async(req,res,next) => {

    const { id, restaurantId } = req.params;

    const order = await orderService.findOneOrder(id, restaurantId)

    if(!order){
        return next(new AppError('Restaurant no found',404))
    }

    req.order = order;
    next()
})