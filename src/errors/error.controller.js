import { envs } from "../config/environments/enviroments.js";
import { AppError } from "./appError.js";


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}

const sendErrorProd = (err, res) => {

    if(err.isOperational){
        //operatinal, trusted error:send messaje to client
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else {
        //programing or other unknowm error: don't like error detail
        console.log("ERROR 🎁",err);
        res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!'
        });
    }
}



export const globalErrorHandler = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail'

    if(envs.NODE_ENV === 'development'){
        sendErrorDev(err, res)
    } 

    if(envs.NODE_ENV === 'production'){
        let error = err;
        
        sendErrorProd(error, res)
    }

};