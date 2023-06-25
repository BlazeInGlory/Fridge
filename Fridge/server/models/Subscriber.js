import { Schema } from "mongoose";

export const SubscriberSchema = new Schema(
  {
    recipeId: { type: Schema.Types.ObjectId, required: true, ref: "FavoriteRecipe" },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

SubscriberSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

SubscriberSchema.index({ accountId: 1, recipeId: 1 }, { unique: true })