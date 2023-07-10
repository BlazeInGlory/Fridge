import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class FavoriteRecipesService {
  async getFavoritesByUserId(accountId) {
    const favorites = await dbContext.FavRecipes.find({ accountId })
    return favorites
  }
  async getFavoritesByRecipeId(recipeId) {
    const favorites = await dbContext.FavRecipes.find({ recipeId })
    return favorites
  }
  async getFavoritesById(recipeId) {
    const favorites = await dbContext.FavRecipes.find({ recipeId })
    return favorites
  }
  async makeOrDeleteFavoriteRecipe(req) {
    const accountId = req.accountId
    const recipeId = req.recipeId
    // NOTE find all the favorite recipes for the user, this will then be filtered down or checked against profile levels 
    // if the app was ever published, ie we could limit the number of favorites a 'free' user could make
    const favorites = await dbContext.FavRecipes.find({ accountId })
    // NOTE once we have the favorite recipes, we then filter down the results to see if the recipe is already a favorite,
    // if it is, we then delete it, if not we return the results of the delete recipe function, which is just a response code
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