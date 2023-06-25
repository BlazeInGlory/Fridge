import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { subscribersService } from "../services/SubscriberService.js";

export class SubscriberController extends BaseController {
  constructor() {
    super('api/subscribers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.becomeSubscriber)
  }
  async becomeSubscriber(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const subscriber = await subscribersService.becomeSubscriber(req.body)
      res.send(subscriber)
    } catch (error) {
      next(error)
    }
  }


}