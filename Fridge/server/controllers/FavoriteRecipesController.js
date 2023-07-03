import { Auth0Provider } from "@bcwdev/auth0provider";
import { favoriteRecipesService } from "../services/FavoriteRecipesService.js";
import BaseController from "../utils/BaseController.js";

export class FavoriteRecipesController extends BaseController {
  constructor() {
    super('api/favorites')
    this.router
      .get('/:recipeId/recipe', this.getFavoriteRecipeByRecipeId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.makeOrDeleteFavoriteRecipe)
      .get('/:userId/user', this.getFavoriteRecipeByUserId)
  }
  async makeOrDeleteFavoriteRecipe(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const favorite = await favoriteRecipesService.makeOrDeleteFavoriteRecipe(req.body)
      return res.send(favorite)
    } catch (error) {
      next(error)
    }
  }
  async getFavoriteRecipeByRecipeId(req, res, next) {
    try {
      const recipeId = req.params.recipeId
      const favorites = await favoriteRecipesService.getFavoritesByRecipeId(recipeId)
      return res.send(favorites)
    } catch (error) {
      next(error)
    }
  }

  async getFavoriteRecipeByUserId(req, res, next) {
    try {
      const userId = req.userInfo.id
      const favorites = await favoriteRecipesService.getFavoritesByUserId(userId)
      return res.send(favorites)
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