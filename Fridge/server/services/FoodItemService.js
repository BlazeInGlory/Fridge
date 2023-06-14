import { dbContext } from "../db/DbContext.js";

class FoodItemService {
  async create(foodItemData) {
    const foodItem = await dbContext.FoodItem.create(foodItemData)
    await foodItem.populate ('account')
    return foodItem
  }
}

export const foodItemService = new FoodItemService()