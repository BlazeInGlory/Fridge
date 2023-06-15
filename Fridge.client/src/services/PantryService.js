import { AppState } from "../AppState.js"
import { FoodItem } from "../models/FoodItem.js"
import { logger } from "../utils/Logger"
import { nutritionix } from "./AxiosService"

class PantryService{
    async searchFood(search){
    const res = await nutritionix.get(`/instant?query=${search}`)
    logger.log('SEARCHING FOODS', res.data.common)

    

    AppState.foodList = res.data.common.map(f => new FoodItem(f))
    logger.log('FOOD IN APPSTATE', AppState.foodList)

}
}
export const pantryService = new PantryService()