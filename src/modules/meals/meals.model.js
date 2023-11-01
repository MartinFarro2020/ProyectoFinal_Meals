import { DataTypes } from "sequelize"
import sequelize from "../../config/database/database.js"

const Meals = sequelize.define('Meals', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active','disabled'),
      allowNull: false,
      defaultValue: 'active'
    }, 

})

export default Meals;