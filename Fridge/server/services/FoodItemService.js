import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden} from "../utils/Errors.js"

class FoodItemService {
  async archiveFood(foodItemId, userId) {
    const foodItem = await this.findFoodItemsById(foodItemId)
    if(foodItem.userId != userId) throw new Forbidden ('error')
    foodItem.archived = true
    await foodItem.save()
    return foodItem
  }
  async addFood(foodItemData) {
    const foodItem = await dbContext.FoodItem.create(foodItemData)
    await foodItem.populate ('account')
    return foodItem
  }

  async findFoodItemsById(foodItemId) {
    const foodItem = await dbContext.FoodItem.findById(foodItemId).populate('userId')
    if(!foodItem) throw new BadRequest(`FoodItem at id ${foodItemId} could not be found`)
    return foodItem
  }
}

export const foodItemService = new FoodItemService()