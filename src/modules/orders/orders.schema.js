import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js'


const updateOrderSchema = z.object({
    totalPrice: z.number().positive(),
    quantity: z.number().positive(),
})

export const updateOrders = ( data ) => {
    const result = updateOrderSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: orderData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        orderData
    }
}