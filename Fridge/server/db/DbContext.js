import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { FoodItemSchema } from "../models/FoodItem.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  FoodItem = mongoose.model('FoodItem', FoodItemSchema);

}

export const dbContext = new DbContext()
