import { verifyPassword } from "../../config/plugins/encriptedPassword.js";
import generateJWT from "../../config/plugins/generate-jwt.js"
import { AppError, catchAsync } from "../../errors/index.js";
import { validateLogin, validateRegister, updateUsers } from "./user.schema.js";
import { UserService } from "./users.services.js";


const userService = new UserService()


export const login = catchAsync(async(req,res,next)=>{
    const { hasError, errorMessages, userData} = validateLogin(req.body)
    
    if(hasError){
        return res.status(422).json({
            status: 'error',
            messages: errorMessages
        })
    }

    const user = await userService.findUserByEmail(userData.email)

    if(!user){
        return next(new AppError('this account does not exist',404))
    }

    const isCorrectPassword = await verifyPassword(userData.password,user.password)

    if(!isCorrectPassword){
        return next(new AppError("Incorrect email or Password",404));
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user:{
            name: user.name,
            email: user.email
        },
    })
}); 

export const register = catchAsync(async(req,res,next)=>{
    const { hasError, errorMessages, userData } = validateRegister(req.body)
    
    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    //creamos el usuario
    const user = await userService.createUser(userData)
    //buscamos el usuario para generar el token
    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user:{
            name: user.name,
            email: user.email
        }
    })
});

export const updateUser = catchAsync(async(req,res,next)=>{
    const { hasError, errorMessages, userData } = updateUsers(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const user = await userService.findOneById(id);

  if (!user) {
    return next(new AppError(`Can't find user with id: ${id}`, 404));
  }

  const updatedUser = await userService.updateUser(user, userData);

  return res.status(200).json(updatedUser);
});

export const deleteUser = catchAsync(async(req,res,next)=>{
    const { hasError, errorMessages, userData } = updateUsers(req.body);

    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }
  
    const { id } = req.params;
  
    const user = await userService.findOneById(id);
  
    if (!user) {
      return next(new AppError(`Can't find user with id: ${id}`, 404));
    }
  
    const deleteUser = await userService.deleteUser(user, userData);
  
    return res.status(200).json(deleteUser);
});


export default generateJWT
 

