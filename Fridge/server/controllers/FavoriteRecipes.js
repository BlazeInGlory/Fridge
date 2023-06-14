import BaseController from "../utils/BaseController.js";

export class FavoriteRecipes extends BaseController {
  constructor() {
    super('api/Favorite')
    this.router
      .get('/findByIngredients?ingredients=')
  }
}