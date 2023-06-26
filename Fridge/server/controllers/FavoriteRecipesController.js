import { Auth0Provider } from "@bcwdev/auth0provider";
import { favoriteRecipesService } from "../services/FavoriteRecipesService.js";
import BaseController from "../utils/BaseController.js";

export class FavoriteRecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.recipeCreation)
      .get('', this.getMyFavoriteRecipes)
      .get('/:recipeId', this.getRecipeById)
    // .delete('/:recipeId', this.deleteFavoriteRecipe)
  }
  // async deleteFavoriteRecipe(req, res, next) {
  //   try {
  //     const userId = req.userInfo.id
  //     const recipeId = req.params.recipeId
  //     const recipe = await favoriteRecipesService.deleteFavoriteRecipe(recipeId, userId)
  //     return res.send(recipe)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  async getRecipeById(req, res, next) {
    try {
      const recipeId = req.params.recipeId
      const recipe = await favoriteRecipesService.getRecipeById(recipeId)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }
  async getMyFavoriteRecipes(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const recipes = await favoriteRecipesService.getMyFavoriteRecipes(accountId)
      return res.send(recipes)
    } catch (error) {
      next(error)
    }
  }
  async recipeCreation(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const accountId = req.userInfo.id
      const spoonacularId = req.body.recipeId
      const recipe = await favoriteRecipesService.recipeCreation(req.body, spoonacularId, accountId)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }

}