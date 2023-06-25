import { dbContext } from "../db/DbContext.js"

class SubscribersService {
  async becomeSubscriber(body) {
    const subscriber = await dbContext.subscribers.create(body)
    await subscriber.populate('account')
  }

}

export const subscribersService = new SubscribersService()