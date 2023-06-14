import { logger } from "../utils/Logger"
import { nutritionix } from "./AxiosService"

class FoodService{
    async getApple(search){
    const res = await nutritionix.get(`/instant?query=${search}`)
    logger.log(res.data.common)
}
}
export const foodService = new FoodService()