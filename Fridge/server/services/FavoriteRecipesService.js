import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

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
  async getMyFavoriteRecipes(accountId) {
    const allRecipes = await dbContext.FavoriteRecipes.find()
    const myRecipes = allRecipes.find(r => {
      r.subscribers.find(s => s == accountId)
    })
    return myRecipes
  }
  async recipeCreation(recipeData, spoonacularId, accountId) {
    // TODO only creates and pushes account id into sub array. create check for pre existing recipe then only add sub!
    let foundRecipe = await dbContext.FavoriteRecipes.findOne({ recipeId: spoonacularId })
    if (foundRecipe) {
      logger.log('this recipe already exists in the database')
      let foundAccount = foundRecipe.subscribers.find(a => a == accountId)
      if(foundAccount) {
        logger.log('account already exists on this recipe')
        return
      } else {
        logger.log('subscribing to recipe')
        foundRecipe.subscribers.push(recipeData.accountId)
        await foundRecipe.save()
        return foundRecipe
      }
    } else {
      logger.log('recipe being created, account being added')
      recipeData.subscribers.push(recipeData.accountId)
      const recipe = await dbContext.FavoriteRecipes.create(recipeData)
      return recipe
    }
  }

}

export const favoriteRecipesService = new FavoriteRecipesService()