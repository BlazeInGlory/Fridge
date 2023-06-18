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
        // if (!AppState.apiOn){ return }
        const res = await api.get('api/pantry')
        logger.log(res.data)
        AppState.pantry = res.data.map( f => new FoodItem(f))
        logger.log(AppState.pantry)
    }
    
    async deleteThisFoodForever(id){
    const res = await api.delete(`api/pantry/${id}/delete`)
    logger.log(res.data)
    AppState.pantry = AppState.pantry.filter(f => f.id != id)
}
// TODO if already exists add qty
// TODO if doesnt exist add the food to pantry
// TODO if already exists subtract qty and flip bool
// TODO if doesnt exist button doesnt show to delete

    async addSubtractFood(addOrSubtract, foodItemId) {
        if (addOrSubtract == 'add') {
            // NOTE find food on the api list that i clicked on
            let addedFood = AppState.foodList.find(f => f.foodItemId == foodItemId)
            logger.log(addedFood)

            // NOTE check and find if the food I clicked on exists in my database
            let foundPantryItem = AppState.pantry.find(f => f.foodItemId == foodItemId)
            // NOTE if it exists just add to the quantity and put it.
            if(foundPantryItem) {
                let foodData = foundPantryItem.quantity ++
                api.put(`api/pantry/${foodItemId}`, foodData)
            // NOTE if it doesnt exists add to quantity and post it.
            } else {
                addedFood.quantity ++
                const res = await api.post('api/pantry', new FoodItem(addedFood))
                logger.log(res.data)
                AppState.pantry.push(new FoodItem(res.data))
                logger.log(addedFood)
            }
        } else if(addOrSubtract == 'subtract') {
            let foundFood = AppState.pantry.find(f => f.foodItemId == foodItemId)
            let foodData = foundFood.quantity --
            api.put(`api/pantry/${foodItemId}`, foodData)
            // const res = await api.put(`api/pantry/${foodItemId}`)
            // logger.log(res.data)
        }
        // NOTE vvv this code was used to subtract one item from the database by the tag_id givin be nutritionix api. it also compares the userId and accountId given by server to determine which food item in the database is yours.

        // else if (addOrSubtract == 'subtract') {
        //     let subtractedFood = AppState.foodList.find(f => f.foodItemId == foodItemId)
        //     logger.log(subtractedFood)

        //     let foundPantryItem = AppState.pantry.find(f => f.foodItemId == foodItemId)
        //     if(foundPantryItem) {
        //         foundPantryItem.quantity --
        //     } else {
        //         const res = await api.delete(`api/pantry/${foodItemId}/delete`)
        //         logger.log(res.data)
        //         subtractedFood.quantity --
        //         AppState.pantry.filter(f => f.foodItemId != subtractedFood.foodItemId)
        //     }

        // }
}
}
export const pantryService = new PantryService()