import { DataTypes } from "sequelize"
import sequelize from "../../config/database/database.js"

const Review = sequelize.define('review', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comnent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    }, 
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('active','delete'),
        defaultValue: 'active'
    }

});

export default Review;
