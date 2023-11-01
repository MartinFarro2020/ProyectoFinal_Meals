import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js'


const updateMealSchema = z.object({
    name: z.string().min(3,{message: 'name is too short'}),
    price: z.number().positive()
})

export const updateMeals = ( data ) => {
    const result = updateMealSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: mealData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        mealData
    }
}