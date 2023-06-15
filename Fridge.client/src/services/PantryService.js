import { AppState } from "../AppState.js"
import { FoodItem } from "../models/FoodItem.js"
import { logger } from "../utils/Logger"
import { api, nutritionix } from "./AxiosService"

class PantryService{
    async searchFood(search){
    const res = await nutritionix.get(`/instant?query=${search}`)
    logger.log(res.data.common)

    AppState.foodList = res.data.common.map(f => new FoodItem(f))
    logger.log('FOOD IN APPSTATE', AppState.foodList)
}

    async getMyPantry(){
    const res = await api.get('api/pantry')
    logger.log(res)
}
    async deleteThisFoodForever(id){
    const res = await api.delete(`api/pantry/${id}`)
    logger.log(res.data)
}
}
export const pantryService = new PantryService()