import { DataTypes } from "sequelize"
import sequelize from "../../config/database/database.js"
import { encryptedPassword } from "../../config/plugins/encriptedPassword.js"

const User = sequelize.define('User', {
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('normal','admin'),
      defaultValue: 'normal',
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available','disabled'),
      allowNull: false,
      defaultValue: 'available'
    } 
},{
  hooks:{
    beforeCreate: async (user) => {
    user.password = await encryptedPassword(user.password)  
    }
  }
})

export default User