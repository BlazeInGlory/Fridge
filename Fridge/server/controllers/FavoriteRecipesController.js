import { Auth0Provider } from "@bcwdev/auth0provider";
import { favoriteRecipesService } from "../services/FavoriteRecipesService.js";
import BaseController from "../utils/BaseController.js";

export class FavoriteRecipesController extends BaseController {
  constructor() {
    super('api/FavoriteRecipes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.favoriteRecipe)
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