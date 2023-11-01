import Meals from "../../modules/meals/meals.model.js";
import Restaurant from "../../modules/restaurants/restaurant.model.js";
import Review from "../../modules/review/review.model.js";
import User from "../../modules/users/users.model.js";


export const initModel = () => {
    User.hasMany(Review)
    Review.belongsTo(User)

    Restaurant.hasMany(Review)
    Review.belongsTo(Restaurant)
    Restaurant.hasMany(Meals)
}

