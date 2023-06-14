import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class FavoriteRecipesService {
  async deleteFavoriteRecipe(recipeId, userId) {
    const recipe = await dbContext.FavoriteRecipes.findById(recipeId).populate('account')

    if (!recipe) throw new BadRequest(`Recipe at id: ${recipeId} does not exist`)
    if (recipe.accountId != userId) throw new Forbidden("Not Yos")

    await recipe.remove()
    return `Recipe at id: ${recipeId} has been deleted`
  }
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
  async favoriteRecipe(favoriteData) {
    const recipe = await dbContext.FavoriteRecipes.create(favoriteData)
    await recipe.populate('account')
    return recipe
  }

}

export const favoriteRecipesService = new FavoriteRecipesService()