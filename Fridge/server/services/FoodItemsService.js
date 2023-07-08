import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js";

class FoodItemsService {
  async editFood(foodData, foodItemId, userId) {
    const originalFoodItem = await dbContext.FoodItems.findOne({ foodItemId: foodItemId, accountId: userId })
    if (!originalFoodItem) throw new BadRequest(`food item at id: ${foodItemId} does not exist`)
    if (originalFoodItem.accountId != userId) throw new Forbidden("unauthorized to change qty on this food item")
    originalFoodItem.quantity = foodData.quantity
    originalFoodItem.storageType = foodData.storageType
    originalFoodItem.archived = false
    originalFoodItem.shoppingQty = foodData.shoppingQty
    originalFoodItem.lastIncreased = foodData.lastIncreased


    await originalFoodItem.save()
    return originalFoodItem
  }
  async removeFoodItem(foodId, userId) {
    const foodItem = await dbContext.FoodItems.findById(foodId)
    if (!foodItem) throw new BadRequest(`food item at id: ${foodId} doesn't exist`)
    if (foodItem.accountId != userId) throw new Forbidden("not yours to delete")
    await foodItem.remove()
    return `food item at ${foodId} has been deleted`
  }
  async findAllFoodItems(accountId) {
    const foodItems = await dbContext.FoodItems.find({ accountId }).populate('account')
    return foodItems
  }

  async archiveFood(foodId, userId) {
    const foodItem = await this.findFoodItemsById(foodId)
    if (!foodItem) { throw new BadRequest(`food item at id: ${foodId} doesnt exist`) }
    if (foodItem.accountId != userId) { throw new Forbidden('unauthorized') }
    foodItem.archived = true
    foodItem.quantity = 0
    await foodItem.save()
    return foodItem
  }
  async addFood(foodItemData) {
    const foodItem = await dbContext.FoodItems.create(foodItemData)
    await foodItem.populate('account')
    return foodItem
  }

  async findFoodItemsById(foodId) {
    const foodItem = await dbContext.FoodItems.findById(foodId)
    // @ts-ignore
    await foodItem.populate('account')
    if (!foodItem) throw new BadRequest(`FoodItem at id ${foodId} could not be found`)
    return foodItem
  }

}

export const foodItemsService = new FoodItemsService()