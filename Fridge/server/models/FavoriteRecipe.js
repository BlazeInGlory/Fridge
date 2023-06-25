import { Schema } from "mongoose";
// const ObjectId = Schema.Types.ObjectId
export const FavoriteRecipeSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: Array, required: false },
    recipeId: { type: String, required: true },
    accountId: { type: String, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

FavoriteRecipeSchema.virtual('subscriberCount', {
  localField: '_id',
  foreignField: 'recipeId',
  ref: 'Subscriber',
  count: true
})