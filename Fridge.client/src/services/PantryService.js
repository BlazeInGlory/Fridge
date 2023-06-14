import { logger } from "../utils/Logger"
import { nutritionix } from "./AxiosService"

class PantryService{
    async searchFood(search){
    const res = await nutritionix.get(`/instant?query=${search}`)
    logger.log(res.data.common)
}
}
export const pantryService = new pantryService()