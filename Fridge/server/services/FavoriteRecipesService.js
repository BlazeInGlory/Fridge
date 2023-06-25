import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { subscribersService } from "./SubscriberService.js"

class FavoriteRecipesService {
  // async deleteFavoriteRecipe(recipeId, userId) {
  //   const recipe = await dbContext.FavoriteRecipes.findOne({ id: recipeId }).populate('account')

  //   if (!recipe) throw new BadRequest(`Recipe at id: ${recipeId} does not exist`)
  //   if (recipe.accountId != userId) throw new Forbidden("Not Yos")

  //   await recipe.remove()
  //   return `Recipe at id: ${recipeId} has been deleted`
  // }
  async getRecipeById(recipeId) {
    const recipe = await dbContext.FavoriteRecipes.findById(recipeId)
    // @ts-ignore
    await recipe.populate('account')
    return recipe
  }
  async getAllFavoriteRecipes() {
    const recipes = await dbContext.FavoriteRecipes.find().populate('account')
    return recipes
  }
  async recipeCreation(recipeData, spoonacularId) {
    // TODO only creates and pushes account id into sub array. create check for pre existing recipe then only add sub!
    // let foundRecipe = await dbContext.FavoriteRecipes.findOne({ recipeId: recipeId })
    // if (foundRecipe) {
    //   logger.log('this recipe already exists in the database')
    //   await subscribersService.becomeSubscriber(recipeData)
    // } else {
    // }
    recipeData.subscribers.push(recipeData.accountId)
    const recipe = await dbContext.FavoriteRecipes.create(recipeData)
    // await recipe.populate('subscriberCount')
    return recipe
  }

}

export const favoriteRecipesService = new FavoriteRecipesService()