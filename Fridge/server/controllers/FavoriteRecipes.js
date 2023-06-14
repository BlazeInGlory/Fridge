import BaseController from "../utils/BaseController.js";

export class FavoriteRecipes extends BaseController {
  constructor() {
    super('')
    this.router
      .get('/findByIngredients?ingredients=')
  }
}