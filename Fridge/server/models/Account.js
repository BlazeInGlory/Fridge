import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, required: false },
    glutenFree: { type: Boolean, default: false},
    vegetarian: { type: Boolean, default: false},
    vegan: { type: Boolean, default: false},
    dairyFree: { type: Boolean, default: false},
    lowCarb: { type: Boolean, default: false},
    // favoriteRecipes: {type:ObjectId, ref:'FavoriteRecipe', required: false}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('favoriteRecipes', {
  localField: '_id',
  foreignField: 'accountId',
  ref: 'FavoriteRecipe',
  justOne: false
})