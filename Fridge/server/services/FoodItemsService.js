import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js"

class FoodItemsService {
  async editFood(foodData, foodItemId, userId) {
    const originalFoodItem = await dbContext.FoodItems.findOne({ foodItemId: foodItemId, accountId: userId })
    if (!originalFoodItem) throw new BadRequest(`food item at id: ${foodItemId} does not exist`)
    if (originalFoodItem.accountId != userId) throw new Forbidden("unauthorized to change qty on this food item")
    originalFoodItem.quantity = foodData.quantity || originalFoodItem.quantity

    await originalFoodItem.save()
    return originalFoodItem
  }
  async removeFoodItem(foodItemId, userId) {
    const foodItem = await dbContext.FoodItems.findOne({ foodItemId: foodItemId, accountId: userId })
    if (!foodItem) throw new BadRequest(`Removing $(foodItemId) isn't possible`)
    if (foodItem.accountId != userId) throw new Forbidden("not yours to delete")
    await foodItem.remove()
    return `food item at ${foodItemId} has been deleted`
  }
  async findAllFoodItems(userId) {
    const foodItems = await dbContext.FoodItems.find({ userId }).populate('account')
    return foodItems
  }
  async archiveFood(foodItemId, accountId) {
    const foodItem = await this.findFoodItemsById(foodItemId)
    if (foodItem.accountId != accountId) throw new Forbidden('error')
    foodItem.archived = true
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