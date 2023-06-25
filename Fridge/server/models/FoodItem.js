import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId

export const FoodItemSchema = new Schema({
  accountId: { type: ObjectId, required: true, ref: 'Account' },
  foodItemId: { type: String, required: true },
  name: { type: String, required: true },
  // NOTE i comment above out if it returns 400
  quantity: { type: Number, required: true },
  shoppingQty: { type: Number, required: false, default: 0 },
  type: { type: String, required: false },
  storageType: { type: String, required: false, default: 'Pantry' },
  archived: { type: Boolean, required: true, default: false },
  photo: { type: Object, required: true },
  // tag_id: { type: String, required: true },
  unit: { type: String, required: true },
  // id: {type: String, required: true}
  // foodItemPreferences: {type: String, required: true, enum: ['vegetarian, vegan, glutenFree, dairyFree, lowFodmap'] }
}, { timestamps: true, toJSON: { virtuals: true } }
)

FoodItemSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})