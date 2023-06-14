import { Auth0Provider } from "@bcwdev/auth0provider";
import { favoriteRecipesService } from "../services/FavoriteRecipesService.js";
import BaseController from "../utils/BaseController.js";

export class FavoriteRecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.favoriteRecipe)
      .get('', this.getAllFavoriteRecipes)
      .get(':recipeId', this.getRecipeById)
      .delete('recipeId', this.deleteFavoriteRecipe)
  }
  async deleteFavoriteRecipe(req, res, next) {
    try {
      const userId = req.userInfo.Id
      const recipeId = req.params.recipeId
      const recipe = await favoriteRecipesService.deleteFavoriteRecipe(recipeId, userId)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }
  async getRecipeById(req, res, next) {
    try {
      const recipeId = req.params.recipeId
      const recipe = await favoriteRecipesService.getRecipeById(recipeId)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }
  async getAllFavoriteRecipes(req, res, next) {
    try {
      const recipes = await favoriteRecipesService.getAllFavoriteRecipes()
      return res.send(recipes)
    } catch (error) {
      next(error)
    }
  }
  async favoriteRecipe(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const recipe = await favoriteRecipesService.favoriteRecipe(req.body)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }

}