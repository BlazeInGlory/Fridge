import { AppState } from "../AppState.js"
import { ApiFoodItem, FoodItem } from "../models/FoodItem.js"
import { NutritionixFoodItem } from "../models/NutritionixFoodItem.js"
import { logger } from "../utils/Logger"
import { api, nutritionix } from "./AxiosService"

class PantryService{

    async searchFood(search){
        // Get the raw data from nutritionix
        const res = await nutritionix.get(`/instant?query=${search}`)
        if (AppState.logging){ logger.log(res.data.common) }
        AppState.foodList = res.data.common.map(f => new NutritionixFoodItem(f))
        
        this.filterDuplicatesInSearch()
    }

    filterDuplicatesInSearch(){
        let foodList = AppState.foodList
        let filteredList = []

        for (let i = 0; i < foodList.length; i++) {
            // get the data from the base array to compare against what we have in the 
            // filtered array, then set j back to 0 and brk to false to reset the comparison
            let check = foodList[i].foodItemId
            let brk = false
            let j = 0
            if (AppState.logging){ logger.log('checking the base array of:', check, 'at index:', i) }
            
            while (!brk && j < filteredList.length){
                // now check the check number against all the values in the filtered array,
                // if a match is found then break and proceed to the next i value
                if(check == filteredList[j].foodItemId){
                    if (AppState.logging){ logger.log('found a match with value of:', filteredList[j].foodItemId) }
                    brk = true
                }
                j++
            }
            
            // If the code did not generate a break, then push the result to the filtered array
            if(!brk){ filteredList.push(foodList[i]) }
        }

        // set the base array to the filtered one
        AppState.foodList = filteredList
    }

    async getMyPantry(){
        // NOTE this turns off api requests when the bool is flipped in the AppState
        // if (!AppState.apiOn){ return }
        // NOTE this makes it so that we don't need to make a new api call if we already have our pantry
        if (AppState.pantry){
            return
        }
        const res = await api.get('api/pantry')
        if (AppState.logging){ logger.log(res.data) }
        AppState.pantry = res.data.map( f => new FoodItem(f))
        if (AppState.logging){ logger.log(AppState.pantry) }
        AppState.filteredPantry = AppState.pantry
    }
    
    async archiveFood(foodId) {
        let foundFood = AppState.pantry.find(f => f.id == foodId)
        foundFood.archived = true
        foundFood.quantity = 0
        if(AppState.logging){ logger.log('The found food to archive is:',foundFood) }
        AppState.filteredPantry = AppState.pantry
        const res = await api.put(`api/pantry/${foodId}/archive`)
        logger.log(res.data)
    }

    async deleteThisFoodForever(id){
        const res = await api.delete(`api/pantry/${id}/delete`)
        if (AppState.logging){ logger.log(res.data) }
        AppState.pantry = AppState.pantry.filter(f => f.id != id)
    }

    async changePantryQty(value, foodItemId){
        if(AppState.pantryPostCheck){
            return
        }
        let foodFromPantry = AppState.pantry.find(f => f.foodItemId == foodItemId)
        if (AppState.logging){ logger.log('the food in the pantry is:', foodFromPantry)}
        let foodFromFiltered = AppState.filteredPantry.find(f => f.foodItemId == foodItemId)
        if (AppState.logging){ logger.log('the food in the filtered pantry is:', foodFromFiltered)}
        let foodFromSearch = AppState.foodList.find(f => f.foodItemId == foodItemId)
        if (AppState.logging){ logger.log('the food in the search is:', foodFromSearch)}


        // If there is no food matching the data in the pantry, go ahead
        // and add it to the pantry via a post
        if(!foodFromPantry){
            AppState.pantryPostCheck = true
            if (AppState.logging){ logger.log('No matching item in the pantry, calling a Post to the db.')}
            await this.addNewFoodToPantry(value, foodItemId)
            // NOTE the function doesn't redefine the variable so we redefine it here
            // new item, so we need to re-define it here
            foodFromPantry = AppState.pantry.find(f => f.foodItemId == foodItemId)
            if (AppState.logging){ logger.log('the food in the pantry is now:', foodFromPantry)}
        }
        else{
            logger.log('Match found in the pantry, changing the value by', value)
            foodFromPantry.quantity += value
            if (foodFromPantry.qty < 0){ foodFromPantry.qty = 0 }
            foodFromPantry.archived = false
        }
        if(foodFromFiltered){
            if (AppState.logging){ logger.log('Match found in the filtered, setting the value to match the pantry')}
            foodFromFiltered.quantity = foodFromPantry.quantity
            foodFromFiltered.archived = false
        }
        if(foodFromSearch){
            if (AppState.logging){ logger.log('Match found in the search, changing the value by', value)}
            foodFromSearch.quantity = foodFromPantry.quantity
            foodFromSearch.archived = false
        }

        const res = await api.put(`api/pantry/${foodItemId}`, foodFromPantry)
        if(AppState.logging)( logger.log(res.data) )
    }

    async setPantryQuantity(value, foodItemId){
        AppState.filteredPantry = AppState.pantry
        let foodFromPantry = AppState.pantry.find(f => f.foodItemId == foodItemId)
        if(!foodFromPantry){ return 'No food found' }
        if (AppState.logging){ logger.log('the food in the pantry is:', foodFromPantry)}
        let foodFromFiltered = AppState.filteredPantry.find(f => f.foodItemId == foodItemId)
        if (AppState.logging){ logger.log('the food in the filtered pantry is:', foodFromFiltered)}

        foodFromPantry.quantity = value
        if (AppState.logging){ logger.log('Sending this to the API', foodFromPantry) }
        foodFromFiltered = foodFromPantry

        if (AppState.logging){ logger.log('setting id:', foodItemId, 'to qty:', value) }
        const res = await api.put( `api/pantry/${foodItemId}`, foodFromPantry )
        if (AppState.logging){ logger.log('the changed pantry item is now:', res.data) }
    }

    async addNewFoodToPantry(value, foodItemId){
        logger.log('adding a new food to the pantry')
        // debugger
        // find the food to add from the search in the AppState
        let addedFood = AppState.foodList.find(f => f.foodItemId == foodItemId)

        // check to see if the value is greater than 0, then
        // set that as the starting qty, else set the value to 0
        // but still add it to the database, this avoids negative
        // inputs that could happen from the search
        if (value >= 1){ addedFood.quantity = value }
        else { addedFood.quantity = 0 }
        if (AppState.logging){ logger.log('the added food found is:',addedFood) }

        // now that we have what we want to add, format it so that it can
        // be added without issues
        const newFood = new ApiFoodItem(addedFood)
        if (AppState.logging){ logger.log('the newFood to add is:', newFood) }

        // send the data up to the server to add to the pantry
        const res = await api.post('api/pantry', newFood)
        if (AppState.logging){ logger.log(res.data) }
        
        // push the server response to both the pantry and the filtered
        // pantry, avoiding any ui glitches
        AppState.pantry.push(new FoodItem(res.data))
        AppState.filteredPantry.push(new FoodItem(res.data))
        // flip the bool in the AppState allowing edits to the quantity to happen again
        AppState.pantryPostCheck = false
    }
}
export const pantryService = new PantryService()