import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId

export const FoodItemSchema = new Schema({
  accountId: { type: ObjectId, required: true, ref: 'Account' },
  foodItemId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  shoppingQty: { type: Number, required: false, default: 1},
  measurementUnit: { type: String, required: true },
  type: { type: String, required: false },
  storageType: { Type: String, required: false, default: 'Pantry' },
  archived: { type: Boolean, required: true, default: false }
}, { timestamps: true, toJSON: { virtuals: true } }
)

FoodItemSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})