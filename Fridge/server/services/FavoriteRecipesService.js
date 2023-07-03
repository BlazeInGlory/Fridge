import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class FavoriteRecipesService {
  async getFavoritesById(recipeId) {
    const favorites = await dbContext.FavRecipes.find({ recipeId })
    return favorites
  }
  async makeFavoriteRecipe(req) {
    const accountId = req.accountId
    const recipeId = req.recipeId
    const favorites = await dbContext.FavRecipes.find({ accountId })
    const isFav = favorites.filter(f => f.recipeId == recipeId)
    if(isFav.length > 0){
      return this.deleteFavoriteRecipe(isFav[0].id)
    }
    const savedFav = await dbContext.FavRecipes.create(req)
    await savedFav.populate('account')
    return savedFav
  }
  async deleteFavoriteRecipe(favId) {
    const fav = await dbContext.FavRecipes.findById(favId)
    if (!fav) throw new BadRequest(`favorite at id: ${favId} doesn't exist`)
    // @ts-ignore
    await fav.remove()
    return `Favorite: ${favId} has been removed.`

  }

  // async getRecipeById(recipeId) {
  //   const recipe = await dbContext.FavoriteRecipes.findById(recipeId)
  //   // @ts-ignore
  //   await recipe.populate('account')
  //   return recipe
  // }
  // async getMyFavoriteRecipes(accountId) {
  //   const allRecipes = await dbContext.FavoriteRecipes.find()
  //   const myRecipes = allRecipes.find(r => {
  //     r.subscribers.find(s => s == accountId)
  //   })
  //   return myRecipes
  // }
  // async recipeCreation(recipeData, spoonacularId, accountId) {
  //   // TODO only creates and pushes account id into sub array. create check for pre existing recipe then only add sub!
  //   let foundRecipe = await dbContext.FavoriteRecipes.findOne({ recipeId: spoonacularId })
  //   if (foundRecipe) {
  //     logger.log('this recipe already exists in the database')
  //     let foundAccount = foundRecipe.subscribers.find(a => a == accountId)
  //     if(foundAccount) {
  //       logger.log('account already exists on this recipe')
  //       return
  //     } else {
  //       logger.log('subscribing to recipe')
  //       foundRecipe.subscribers.push(recipeData.accountId)
  //       await foundRecipe.save()
  //       return foundRecipe
  //     }
  //   } else {
  //     logger.log('recipe being created, account being added')
  //     recipeData.subscribers.push(recipeData.accountId)
  //     const recipe = await dbContext.FavoriteRecipes.create(recipeData)
  //     return recipe
  //   }
  // }

}

export const favoriteRecipesService = new FavoriteRecipesService()