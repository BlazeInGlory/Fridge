import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId
export const FavoriteRecipeSchema = new Schema(
  {
    recipeId: { type: String, required: true },
    accountId: {type: ObjectId, ref:'Account', required: true}
  }, { timestamps: true, toJSON: { virtuals: true } }
)

FavoriteRecipeSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})