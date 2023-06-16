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
        if (f.unit.includes(',')) {
            allUnits += f.unit
            newServingUnit = allUnits.split(',')
            let firstIndex = newServingUnit[0]
            f.unit = firstIndex
        }
    })
    
    logger.log('FOOD IN APPSTATE', AppState.foodList)
}

async getMyPantry(){
    // NOTE this turns off api requests when the bool is flipped in the AppState
        if (!AppState.apiOn){ return }
        const res = await api.get('api/pantry')
        AppState.pantry = res.data.map( f => new FoodItem(f))
        logger.log(AppState.pantry)
    }
    
    async deleteThisFoodForever(id){
    const res = await api.delete(`api/pantry/${id}`)
    logger.log(res.data)
}

    async addSubtractFood(addOrSubtract, foodItemId) {
        if (addOrSubtract == 'add') {
            let addedFood = AppState.foodList.find(f => f.foodItemId == foodItemId)
            logger.log(addedFood)
            const res = await api.post('api/pantry', addedFood)
            logger.log(res.data)
            addedFood.quantity ++
            AppState.pantry.push(new FoodItem(res.data))
            logger.log(addedFood)
        } else if (addOrSubtract == 'subtract') {
            let subtractedFood = AppState.foodList.find(f => f.foodItemId == foodItemId)
            logger.log(subtractedFood)
            const res = await api.delete(`api/pantry/${foodItemId}/delete`)
            logger.log(res.data)
            AppState.pantry.filter(f => f.foodItemId != subtractedFood.foodItemId)
        }
    
}
}
export const pantryService = new PantryService()