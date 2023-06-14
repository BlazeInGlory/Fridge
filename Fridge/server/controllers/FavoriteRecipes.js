import BaseController from "../utils/BaseController.js";

export class FavoriteRecipes extends BaseController {
  constructor() {
    super('api/favorites')
    this.router
      .get('/findByIngredients?ingredients=')
  }
}