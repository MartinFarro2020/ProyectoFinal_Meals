import User from "./users.model.js"

export class UserService{

    async createUser(data){
        return await User.create(data)
    }

    async findOneById(id){
        return await User.findOne({
            where:{
                id,
                status: 'available'
            }
        })

    }

    async updateUser(user, data){
        return await user.update( data )
    }

    async deleteUser(user){
        return await user.update({ status: 'disabled'})
    }

    async findUserByEmail(email){
        return await User.findOne({
            where:{
                email,
                status: 'available'
            },
        })
    }
}
