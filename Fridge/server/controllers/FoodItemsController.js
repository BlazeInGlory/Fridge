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
      .put('/:foodItemId', this.editFood)
      .put('/:foodId/archive', this.archiveFood)
      .delete('/:foodId/delete', this.removeFoodItem)
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
      const foodItem = await foodItemsService.archiveFood(req.params.foodId, req.userInfo.id)
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
      const accountId = req.userInfo.id
      const foodItems = await foodItemsService.findAllFoodItems(accountId)
      return res.send(foodItems)
    } catch (error) {
      next(error)
    }
  }

  async removeFoodItem(req, res, next) {
    try {
      // req.body.accountId = req.userInfo.id
      const foodItem = await foodItemsService.removeFoodItem(req.params.foodId, req.userInfo.id)
      return res.send(foodItem)
    } catch (error) {
      next(error)
    }
  }

  async editFood(req, res, next) {
    try {
      const editedFood = await foodItemsService.editFood(req.body, req.params.foodItemId, req.userInfo.id)
      return res.send(editedFood)
    } catch (error) {
      next(error)
    }
  }

  // async findFoodByPreferences(req, res, next) {
  //   try {
  //     const accountId = req.userInfo.id
  //     const foodItemPreference = await foodItemsService.findFoodByPreferences(accountId)
  //     return res.send(foodItemPreference)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}


