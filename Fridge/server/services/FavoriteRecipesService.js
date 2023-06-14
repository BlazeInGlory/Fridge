import { dbContext } from "../db/DbContext.js"

class FavoriteRecipesService {
  async favoriteRecipe() {
    const recipe = await dbContext.FavoriteRecipes
  }

}

export const favoriteRecipesService = new FavoriteRecipesService()