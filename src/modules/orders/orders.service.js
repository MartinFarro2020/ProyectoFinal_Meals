import Order from "./orders.model.js";

export class OrderService{

    async findAllOrders(id){
        return await Order.findAll({
            where:{
                userId:id,
                status:'active'
            }
        })
    }

   
    async createOrder(data){
        return await Order.create(data)
    }

    async findOneById(id){
        return await Order.findOne({
            where:{
                id,
                status: 'active'
            }
        })

    }
    
    async findOneOrder(id, restaurantId){
        return await Order.findOne({
            where:{
                id: restaurantId || id,
                status: 'active'
            }
        })
    }

    async updateOrder(order){
        return await order.update({ status:'completed'})
    }

    async deleteOrder(order){
        return await order.update({ status: 'cancelled'})
    }

}