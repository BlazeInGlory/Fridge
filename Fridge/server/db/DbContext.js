import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { FavoriteRecipeSchema } from "../models/FavoriteRecipe.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  FavoriteRecipes = mongoose.model('FavoriteRecipe', FavoriteRecipeSchema)
}

export const dbContext = new DbContext()
