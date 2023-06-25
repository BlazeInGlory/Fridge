import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"

class SubscribersService {
  async becomeSubscriber(body) {
    const subscriber = await dbContext.subscribers.create(body)
    await subscriber.populate('account')
  }

}

export const subscribersService = new SubscribersService()