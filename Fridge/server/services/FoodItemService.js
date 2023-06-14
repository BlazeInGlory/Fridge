import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden} from "../utils/Errors.js"

class FoodItemService {
  async findAllFoodItems(foodItemsData) {
    const foodItems = await dbContext.FoodItems.create(foodItemsData)
    await foodItems.populate('account')
    return foodItems
  }
  async archiveFood(foodItemId, accountId) {
    const foodItem = await this.findFoodItemsById(foodItemId)
    if(foodItem.accountId != accountId) throw new Forbidden ('error')
    foodItem.archived = true
    await foodItem.save()
    return foodItem
  }
  async addFood(foodItemData) {
    const foodItem = await dbContext.FoodItems.create(foodItemData)
    await foodItem.populate ('account')
    return foodItem
  }

  async findFoodItemsById(foodItemId) {
    const foodItem = await dbContext.FoodItems.findById(foodItemId).populate('userId')
    if(!foodItem) throw new BadRequest(`FoodItem at id ${foodItemId} could not be found`)
    return foodItem
  }
}

export const foodItemService = new FoodItemService()