import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const FavoriteRecipeSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    missedIngredients: { type: String, required: false },
    usedIngredients: { type: String, required: false },
    ingredients: { type: Array, required: false },
    accountId: { type: ObjectId, required: true, ref: 'Account' }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

FavoriteRecipeSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})