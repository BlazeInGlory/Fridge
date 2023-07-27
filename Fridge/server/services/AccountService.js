import { dbContext } from '../db/DbContext'
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    if (typeof user.name == 'string' && user.name.includes('@')) {
      user.name = user.nickname
    }
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
// /**
//  * Restricts changes to the body of the account object
//  * @param {any} body
//  */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  async editAccount(user, editedAccount) {
    const accountToEdit = await this.getAccount(user)
    if (!accountToEdit) {
      throw new BadRequest("This account doesn't exist.")
    }
    // NOTE don't allow edits to an account if the ids don't match
    if (user.id != accountToEdit.id){
      throw new UnAuthorized("You are not authorized to make these changes.")
    }
    if(editedAccount.email != null){
      accountToEdit.email = editedAccount.email  
    }
    if(editedAccount.name != null){
      accountToEdit.name = editedAccount.name
    }
    if(editedAccount.picture != null){
      accountToEdit.picture = editedAccount.picture
    }
    if(editedAccount.glutenFree != null){
      accountToEdit.glutenFree = editedAccount.glutenFree  
    }
    if(editedAccount.vegetarian != null){
    accountToEdit.vegetarian = editedAccount.vegetarian
    }
    if(editedAccount.vegan != null){
    accountToEdit.vegan = editedAccount.vegan
    }
    if(editedAccount.dairyFree != null){
    accountToEdit.dairyFree = editedAccount.dairyFree
    }
    if(editedAccount.lowCarb != null){
    accountToEdit.lowCarb = editedAccount.lowCarb
    }
    // NOTE not entirely sure why this didn't work, but I left it here to look into later 
    // @ts-ignore
    // accountToEdit.email = editedAccount.email || accountToEdit.email
    // @ts-ignore
    // accountToEdit.name = editedAccount.name || accountToEdit.name
    // @ts-ignore
    // accountToEdit.picture = editedAccount.picture || accountToEdit.picture
    // @ts-ignore
    // accountToEdit.glutenFree = editedAccount.glutenFree || accountToEdit.glutenFree
    // @ts-ignore
    // accountToEdit.vegetarian = editedAccount.vegetarian || accountToEdit.vegetarian
    // @ts-ignore
    // accountToEdit.vegan = editedAccount.vegan || accountToEdit.vegan
    // @ts-ignore
    // accountToEdit.dairyFree = editedAccount.dairyFree || accountToEdit.dairyFree
    // @ts-ignore
    // accountToEdit.lowCarb = editedAccount.lowCarb || accountToEdit.lowCarb

    await accountToEdit.save()
    return accountToEdit
  }

  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    }).populate('favoriteRecipes')
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }
}
export const accountService = new AccountService()
