import { Auth0Provider } from "@bcwdev/auth0provider";
import { foodItemsService } from "../services/FoodItemsService.js";
import BaseController from "../utils/BaseController.js"

export class FoodItemsController extends BaseController {
  constructor() {
    super('api/pantry')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addFood)
      .get('', this.findAllFoodItems)
      .get('/:foodId', this.findFoodItemsById)
      .delete('/:foodItemId', this.archiveFood)
      .delete('/:foodItemId/delete', this.removeFoodItem)
  }

  async addFood(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const foodItem = await foodItemsService.addFood(req.body)
      return res.send(foodItem)
    } catch (error) {
      next(error)
    }
  }

  async archiveFood(req, res, next) {
    try {
      const foodItem = await foodItemsService.archiveFood(req.params.foodItemId, req.userInfo.userId)
      return res.send(foodItem)
    } catch (error) {
      next(error)
    }
  }

  async findFoodItemsById(req, res, next) {
    try {
      const foodItem = await foodItemsService.findFoodItemsById(req.params.foodId)
      return res.send(foodItem)
    } catch (error) {
      next(error)
    }
  }

  async findAllFoodItems(req, res, next) {
    try {
      const foodItems = await foodItemsService.findAllFoodItems()
      return res.send(foodItems)
    } catch (error) { 
    }
  }

  async removeFoodItem(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const foodItem = await foodItemsService.removeFoodItem(req.params.foodItemId, req.body.accountId)
      return res.send(foodItem)
    } catch (error) {
      next(error)
    }
  }
}


