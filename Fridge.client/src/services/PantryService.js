import { AppState } from "../AppState.js"
import { ApiFoodItem, FoodItem } from "../models/FoodItem.js"
import { logger } from "../utils/Logger"
import { api, nutritionix } from "./AxiosService"

class PantryService{
    async searchFood(search){
    const res = await nutritionix.get(`/instant?query=${search}`)
    logger.log(res.data.common)

    AppState.foodList = res.data.common.map(f => new ApiFoodItem(f))
    
    let allUnits = ""
    let newServingUnit = ""
    AppState.foodList.forEach(f => {
        if (f.serving_unit.includes(',')) {
            allUnits += f.serving_unit
            newServingUnit = allUnits.split(',')
            let firstIndex = newServingUnit[0]
            f.serving_unit = firstIndex
        }
    })
    
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

    async addSubtractFood(string, tag_id) {
    let addedFood = AppState.foodList.find(f => f.tag_id == tag_id)
    logger.log(addedFood)
    const res = await api.post('api/pantry', addedFood)
    logger.log(res.data)
    
}
}
export const pantryService = new PantryService()