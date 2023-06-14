import { dbContext } from "../db/DbContext.js"

class FavoriteRecipesService {
  async favoriteRecipe(favoriteData) {
    const recipe = await dbContext.FavoriteRecipes.create(favoriteData)
    await recipe.populate('account')
    return recipe
  }

}

export const favoriteRecipesService = new FavoriteRecipesService()