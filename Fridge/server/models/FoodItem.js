import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId

export const FoodItemSchema = new Schema({
  accountId: { type: ObjectId, required: true, ref: 'Account' },
  foodItemId: { type: String, required: true },
  name: { type: String, required: true },
  // NOTE i comment above out if it returns 400
  quantity: { type: Number, required: true },
  shoppingQty: { type: Number, required: false, default: 1 },
  serving_unit: { type: String, required: true },
  type: { type: String, required: false },
  storageType: { type: String, required: false, default: 'Pantry' },
  archived: { type: Boolean, required: true, default: false },
  tag_id: { type: String, required: true },
  photo: { type: Object, required: false }
}, { timestamps: true, toJSON: { virtuals: true } }
)

FoodItemSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})