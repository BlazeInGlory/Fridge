import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { FoodItemSchema } from "../models/FoodItem.js";
import { FavoriteRecipeSchema } from "../models/FavoriteRecipe.js";
import { SubscriberSchema } from "../models/Subscriber.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  FoodItems = mongoose.model('FoodItem', FoodItemSchema);
  FavoriteRecipes = mongoose.model('FavoriteRecipe', FavoriteRecipeSchema);
  foodItemPreferences = mongoose.model('FoodItemPreferences', FoodItemSchema);
  subscribers = mongoose.model('subscriber', SubscriberSchema)
}

export const dbContext = new DbContext()
