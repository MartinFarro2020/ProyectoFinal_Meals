import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js'


const updateRestaurantSchema = z.object({
    name: z.string().min(3,{message: 'name is too short'}),
    address: z.string().min(3,{message: 'name is too short'}),
    rating: z.number().positive()
})

export const updateRestaurants = ( data ) => {
    const result = updateRestaurantSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: restaurantData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        restaurantData
    }
}