import { Auth0Provider } from "@bcwdev/auth0provider";
import { favoriteRecipesService } from "../services/FavoriteRecipesService.js";
import BaseController from "../utils/BaseController.js";

export class FavoriteRecipesController extends BaseController {
  constructor() {
    super('api/favorites')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.makeFavoriteRecipe)
      .get('/:recipeId', this.getFavoriteRecipeById)
  }
  async makeFavoriteRecipe(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const recipe = await favoriteRecipesService.makeFavoriteRecipe(req.body)
      return res.send(recipe)

    } catch (error) {
      next(error)
    }
  }
  async getFavoriteRecipeById(req, res, next) {
    try {
      const recipeId = req.params.recipeId
      const recipes = await favoriteRecipesService.getFavoritesById(recipeId)
      return res.send(recipes)
    } catch (error) {
      next(error)
    }
  }
  // async recipeCreation(req, res, next) {
  //   try {
  //     req.body.accountId = req.userInfo.id
  //     const accountId = req.userInfo.id
  //     const spoonacularId = req.body.recipeId
  //     const recipe = await favoriteRecipesService.recipeCreation(req.body, spoonacularId, accountId)
  //     return res.send(recipe)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}