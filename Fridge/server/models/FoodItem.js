import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId

export const FoodItemSchema = new Schema({
  userId: {type: ObjectId, required: true, ref: 'Account'},
  accountId: {type:ObjectId, required: true, ref: 'Account'},
  foodItemId: {type: String, required: true},
  name: {type: String, required: true},
  // nutrients: {type:String, required: true},
  quantity: {type: Number, required: true},
  measurementUnit: {type: String, required: true},
  type: {type: String, required: false},
  storageType: {Type: String, required: false},
  archived: {type: Boolean, required: true, default: false}
})

FoodItemSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})