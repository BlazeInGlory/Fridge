import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      // .put('/:id', this.editAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  // async editAccount(req, res, next) {
  //   try {
  //     req.body.accountId = req.userInfo.id
  //     const editedAccount = await accountService.editAccount(req.params.id, req.body)
  //     res.send(editedAccount)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
