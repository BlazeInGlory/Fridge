import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const FavoriteRecipeSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    imageType: { type: String, required: true },
    missedIngredientCount: { type: Number, required: true },
    missedIngredients: { type: String, required: true },
    usedIngredientCount: { type: Number, required: true },
    usedIngredients: { type: String, required: true },
    accountId: { type: ObjectId, required: true, ref: 'Account' }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

FavoriteRecipeSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})