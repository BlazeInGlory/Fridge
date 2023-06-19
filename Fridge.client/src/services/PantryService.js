import { AppState } from "../AppState.js"
import { ApiFoodItem, FoodItem } from "../models/FoodItem.js"
import { NutritionixFoodItem } from "../models/NutritionixFoodItem.js"
import { logger } from "../utils/Logger"
import { api, nutritionix } from "./AxiosService"

class PantryService{

    async archiveFood(foodId) {
        const res = await api.put(`api/pantry/${foodId}/archive`)
        logger.log(res.data)
        AppState.pantry = AppState.pantry.filter(f => f.id != foodId)
    }

    async searchPantry(searchTerm) {
        const res = await api.get('api/pantry', {
            params: {
                query: searchTerm
            }
        })
        logger.log('searching pantry', res.data)
        AppState.pantry = res.data.common.map(f => new FoodItem(f))
    }
    async searchFood(search){
    const res = await nutritionix.get(`/instant?query=${search}`)
    if (AppState.logging){ logger.log(res.data.common) }
    
    AppState.foodList = res.data.common.map(f => new NutritionixFoodItem(f))
    // NOTE loops over two arrays and equals api quantity to the same pantry items quantity
    // AppState.foodList.forEach(f => {
    //     AppState.pantry.forEach(p => f.foodItemId == p.foodItemId)
    //     f.quantity = p.quantity
    // })


    // AppState.foodList = AppState.foodList.forEach(f => {
    //     if(f.foodItemId == AppState.pantry.foodItemId) {
    //         f.quantity = AppState.pantry.quantity
    //     }
    // })
    

    
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
        if (AppState.logging){ logger.log(res.data) }
        AppState.pantry = res.data.map( f => new FoodItem(f))
        if (AppState.logging){ logger.log(AppState.pantry) }
    }
    
    async deleteThisFoodForever(id){
    const res = await api.delete(`api/pantry/${id}/delete`)
    if (AppState.logging){ logger.log(res.data) }
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
            if (AppState.logging){ logger.log('the added food found is:',addedFood) }

            // NOTE check and find if the food I clicked on exists in my database
            let foundPantryItem = AppState.pantry.find(f => f.foodItemId == foodItemId)
            // NOTE if it exists just add to the quantity and put it.
            if(foundPantryItem) {
                foundPantryItem.quantity ++
                foundPantryItem.archived = false
                const res = await api.put(`api/pantry/${foodItemId}`, foundPantryItem)
                if (AppState.logging){ logger.log(res.data, 'Adding Qty') }
            // NOTE if it doesnt exists add to quantity and post it.
            } else {
                addedFood.quantity ++
                const newFood = new ApiFoodItem(addedFood)
                logger.log('the newFood to add is:', newFood)
                const res = await api.post('api/pantry', newFood)
                if (AppState.logging){ logger.log(res.data) }
                AppState.pantry.push(new FoodItem(res.data))
                if (AppState.logging){ logger.log(addedFood) }
            }
        } else if(addOrSubtract == 'subtract') {
            let foundPantryItem = AppState.pantry.find(f => f.foodItemId == foodItemId)
            if(foundPantryItem.quantity == 0) { return }
            foundPantryItem.quantity --
            const res = await api.put(`api/pantry/${foodItemId}`, foundPantryItem)
            if (AppState.logging){ logger.log(res.data, 'subtracting qty') }
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