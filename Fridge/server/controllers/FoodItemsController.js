import { Auth0Provider } from "@bcwdev/auth0provider";
import { foodItemsService } from "../services/FoodItemsService.js";
import BaseController from "../utils/BaseController.js"

export class FoodItemsController extends BaseController {
  constructor() {
    super('api/pantry')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addFood)
      .delete('/:foodItemId', this.archiveFood)
    // .get('', this.findAllFoodItems)
    // .get('/:id', this.findFoodItemById)
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
}

//   async findAllFoodItems(req, res, next) {
//     try {
//       const foodItems = await foodItemService.findAllFoodItems()
//       return res.send(foodItems)
//     }catch(error) {
//       next(error)
//     }
//   }


