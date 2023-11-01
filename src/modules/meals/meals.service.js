import Meals from "./meals.model.js";

export class MealService{

    async findAllMeals(){
        return await Meals.findAll({
            where:{
                status:'active'
            }
        })
    }

    async createMeal(data){
        return await Meals.create(data)
    }

    async findOneById(id){
        return await Meals.findOne({
            where:{
                id,
                status: 'active'
            }
        })

    }
    
    async findOneMeal(id, restaurantId){
        return await Meals.findOne({
            where:{
                id: restaurantId || id,
                status: 'active'
            }
        })
    }

    async updateMeal(meal, data){
        return await meal.update( data )
    }

    async deleteMeal(meal){
        return await meal.update({ status: 'disable'})
    }

}